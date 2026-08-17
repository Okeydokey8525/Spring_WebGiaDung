package vn.homestore.api.catalog.product.application;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.homestore.api.catalog.product.api.PublicProductDetailResponse;
import vn.homestore.api.catalog.product.api.PublicProductPageResponse;
import vn.homestore.api.catalog.product.api.PublicProductSummaryResponse;
import vn.homestore.api.catalog.product.domain.Product;
import vn.homestore.api.catalog.product.domain.ProductStatus;
import vn.homestore.api.catalog.product.infrastructure.ProductRepository;
import vn.homestore.api.common.error.InvalidRequestException;
import vn.homestore.api.common.error.ResourceNotFoundException;

@Service
@Transactional(readOnly = true)
public class PublicProductService {

    private static final int MAX_PAGE_SIZE = 100;

    private final ProductRepository productRepository;

    public PublicProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public PublicProductPageResponse listActiveProducts(int page, int size) {
        if (page < 0) {
            throw new InvalidRequestException("Page must be greater than or equal to 0");
        }
        if (size < 1 || size > MAX_PAGE_SIZE) {
            throw new InvalidRequestException("Size must be between 1 and 100");
        }

        PageRequest pageRequest = PageRequest.of(
                page,
                size,
                Sort.by(Sort.Direction.DESC, "id")
        );

        Page<Product> products = productRepository.findAllByStatus(
                ProductStatus.ACTIVE,
                pageRequest
        );

        return new PublicProductPageResponse(
                products.getContent()
                        .stream()
                        .map(PublicProductSummaryResponse::from)
                        .toList(),
                products.getNumber(),
                products.getSize(),
                products.getTotalElements(),
                products.getTotalPages()
        );
    }

    public PublicProductDetailResponse getActiveProductBySlug(String slug) {
        Product product = productRepository.findBySlugAndStatus(
                        slug,
                        ProductStatus.ACTIVE
                )
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        return PublicProductDetailResponse.from(product);
    }
}
