package vn.homestore.api.catalog.product.application;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.homestore.api.catalog.brand.application.BrandService;
import vn.homestore.api.catalog.category.application.CategoryService;
import vn.homestore.api.catalog.product.api.CreateProductRequest;
import vn.homestore.api.catalog.product.api.ProductResponse;
import vn.homestore.api.catalog.product.api.UpdateProductRequest;
import vn.homestore.api.catalog.product.domain.Product;
import vn.homestore.api.catalog.product.domain.ProductStatus;
import vn.homestore.api.catalog.product.infrastructure.ProductRepository;
import vn.homestore.api.common.error.InvalidRequestException;
import vn.homestore.api.common.error.ResourceConflictException;
import vn.homestore.api.common.error.ResourceNotFoundException;
import vn.homestore.api.common.persistence.ConstraintViolationDetector;

import java.util.List;

@Service
@Transactional
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductSlugService productSlugService;
    private final CategoryService categoryService;
    private final BrandService brandService;

    public ProductService(ProductRepository productRepository, ProductSlugService productSlugService,
                          CategoryService categoryService, BrandService brandService) {
        this.productRepository = productRepository;
        this.productSlugService = productSlugService;
        this.categoryService = categoryService;
        this.brandService = brandService;
    }

    public ProductResponse createProduct(CreateProductRequest request) {
        if (request.status() == ProductStatus.ARCHIVED) {
            throw new InvalidRequestException("Cannot create a product in ARCHIVED status");
        }

        // Validate references using existing services
        categoryService.getCategoryById(request.categoryId());
        if (request.brandId() != null) {
            brandService.getBrandById(request.brandId());
        }

        String normalizedName = normalizeName(request.name());
        String slug = productSlugService.determineSlug(request.slug(), normalizedName);
        
        String safeShortDescription = normalizeNullableText(request.shortDescription(), true);
        String safeDescription = normalizeNullableText(request.description(), false);
        String safeSeoTitle = normalizeNullableText(request.seoTitle(), true);
        String safeSeoDescription = normalizeNullableText(request.seoDescription(), true);

        Product product = new Product(
                request.categoryId(),
                request.brandId(),
                normalizedName,
                slug,
                safeShortDescription,
                safeDescription,
                request.status(),
                safeSeoTitle,
                safeSeoDescription
        );

        try {
            Product saved = productRepository.saveAndFlush(product);
            return ProductResponse.from(saved);
        } catch (DataIntegrityViolationException ex) {
            handlePersistenceExceptions(ex);
            throw ex;
        }
    }

    public ProductResponse updateProduct(Long id, UpdateProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        if (product.getStatus() == ProductStatus.ARCHIVED) {
            throw new ResourceConflictException("Archived products cannot be modified.");
        }

        if (request.status() == ProductStatus.ARCHIVED) {
            throw new InvalidRequestException("Cannot transition a product to ARCHIVED status via update");
        }

        categoryService.getCategoryById(request.categoryId());
        if (request.brandId() != null) {
            brandService.getBrandById(request.brandId());
        }

        String normalizedName = normalizeName(request.name());
        String slug = productSlugService.determineSlug(request.slug(), normalizedName);
        
        String safeShortDescription = normalizeNullableText(request.shortDescription(), true);
        String safeDescription = normalizeNullableText(request.description(), false);
        String safeSeoTitle = normalizeNullableText(request.seoTitle(), true);
        String safeSeoDescription = normalizeNullableText(request.seoDescription(), true);

        product.update(
                request.categoryId(),
                request.brandId(),
                normalizedName,
                slug,
                safeShortDescription,
                safeDescription,
                request.status(),
                safeSeoTitle,
                safeSeoDescription
        );

        try {
            Product saved = productRepository.saveAndFlush(product);
            return ProductResponse.from(saved);
        } catch (DataIntegrityViolationException ex) {
            handlePersistenceExceptions(ex);
            throw ex;
        }
    }

    public void archiveProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        if (product.getStatus() == ProductStatus.ARCHIVED) {
            return;
        }

        product.archive();
        productRepository.saveAndFlush(product);
    }

    @Transactional(readOnly = true)
    public ProductResponse getProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        return ProductResponse.from(product);
    }

    @Transactional(readOnly = true)
    public Product getActiveProductOrThrow(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        if (product.getStatus() == ProductStatus.ARCHIVED) {
            throw new ResourceConflictException("Archived products cannot have attribute assignments modified.");
        }
        return product;
    }

    public boolean existsById(Long id) {
        return productRepository.existsById(id);
    }

    @Transactional(readOnly = true)
    public List<ProductResponse> listProducts() {
        return productRepository.findAll(Sort.by(Sort.Direction.DESC, "id"))
                .stream()
                .map(ProductResponse::from)
                .toList();
    }

    private String normalizeName(String name) {
        String n = name.trim().replaceAll("\\s+", " ");
        if (n.isEmpty()) {
            throw new InvalidRequestException("Product name cannot be blank");
        }
        return n;
    }

    private String normalizeNullableText(String text, boolean collapseWhitespace) {
        if (text == null) {
            return null;
        }
        String n = text.trim();
        if (collapseWhitespace) {
            n = n.replaceAll("\\s+", " ");
        }
        if (n.isEmpty()) {
            return null;
        }
        return n;
    }

    private void handlePersistenceExceptions(DataIntegrityViolationException ex) {
        if (ConstraintViolationDetector.isConstraintViolated(ex, "UX_products_slug")) {
            throw new ResourceConflictException("Product with this slug already exists.");
        }
        if (ConstraintViolationDetector.isConstraintViolated(ex, "FK_products_category")) {
            throw new ResourceConflictException("Category is no longer available.");
        }
        if (ConstraintViolationDetector.isConstraintViolated(ex, "FK_products_brand")) {
            throw new ResourceConflictException("Brand is no longer available.");
        }
    }
}
