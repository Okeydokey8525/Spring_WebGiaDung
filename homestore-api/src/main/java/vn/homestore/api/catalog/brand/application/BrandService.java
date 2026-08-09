package vn.homestore.api.catalog.brand.application;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.homestore.api.catalog.brand.api.BrandResponse;
import vn.homestore.api.catalog.brand.api.CreateBrandRequest;
import vn.homestore.api.catalog.brand.api.UpdateBrandRequest;
import vn.homestore.api.catalog.brand.domain.Brand;
import vn.homestore.api.catalog.brand.infrastructure.BrandRepository;
import vn.homestore.api.common.error.InvalidRequestException;
import vn.homestore.api.common.error.ResourceConflictException;
import vn.homestore.api.common.error.ResourceNotFoundException;
import vn.homestore.api.common.persistence.ConstraintViolationDetector;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class BrandService {

    private final BrandRepository brandRepository;
    private final BrandSlugService brandSlugService;

    public BrandService(BrandRepository brandRepository, BrandSlugService brandSlugService) {
        this.brandRepository = brandRepository;
        this.brandSlugService = brandSlugService;
    }

    public BrandResponse createBrand(CreateBrandRequest request) {
        String normalizedName = normalizeName(request.name());
        
        String rawSlug = request.slug() != null && !request.slug().isBlank() ? request.slug() : normalizedName;
        String normalizedSlug = brandSlugService.generateSlug(rawSlug);

        validateWebsiteUrl(request.websiteUrl());

        if (brandRepository.existsByName(normalizedName)) {
            throw new ResourceConflictException("Duplicate brand name");
        }

        if (brandRepository.existsBySlug(normalizedSlug)) {
            throw new ResourceConflictException("Duplicate brand slug");
        }

        Brand brand = new Brand(normalizedName, normalizedSlug);
        
        if (request.description() != null) brand.setDescription(request.description().trim());
        if (request.logoUrl() != null) brand.setLogoUrl(request.logoUrl().trim());
        if (request.websiteUrl() != null) brand.setWebsiteUrl(request.websiteUrl().trim());
        if (request.seoTitle() != null) brand.setSeoTitle(request.seoTitle().trim());
        if (request.seoDescription() != null) brand.setSeoDescription(request.seoDescription().trim());
        
        brand.setSortOrder(request.sortOrder() != null ? request.sortOrder() : 0);
        brand.setActive(request.active() != null ? request.active() : true);

        try {
            brand = brandRepository.saveAndFlush(brand);
            return mapToResponse(brand);
        } catch (DataIntegrityViolationException e) {
            handleBrandDataIntegrityViolation(e);
            throw e;
        }
    }

    public BrandResponse updateBrand(Long id, UpdateBrandRequest request) {
        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Brand not found"));

        String normalizedName = normalizeName(request.name());
        
        String rawSlug = request.slug() != null && !request.slug().isBlank() ? request.slug() : normalizedName;
        String normalizedSlug = brandSlugService.generateSlug(rawSlug);

        validateWebsiteUrl(request.websiteUrl());

        if (brandRepository.existsByNameAndIdNot(normalizedName, brand.getId())) {
            throw new ResourceConflictException("Duplicate brand name");
        }

        if (brandRepository.existsBySlugAndIdNot(normalizedSlug, brand.getId())) {
            throw new ResourceConflictException("Duplicate brand slug");
        }

        brand.setName(normalizedName);
        brand.setSlug(normalizedSlug);
        
        brand.setDescription(request.description() != null ? request.description().trim() : null);
        brand.setLogoUrl(request.logoUrl() != null ? request.logoUrl().trim() : null);
        brand.setWebsiteUrl(request.websiteUrl() != null ? request.websiteUrl().trim() : null);
        brand.setSeoTitle(request.seoTitle() != null ? request.seoTitle().trim() : null);
        brand.setSeoDescription(request.seoDescription() != null ? request.seoDescription().trim() : null);
        
        brand.setSortOrder(request.sortOrder());
        brand.setActive(request.active());

        try {
            brand = brandRepository.saveAndFlush(brand);
            return mapToResponse(brand);
        } catch (DataIntegrityViolationException e) {
            handleBrandDataIntegrityViolation(e);
            throw e;
        }
    }

    public void deleteBrand(Long id) {
        if (!brandRepository.existsById(id)) {
            throw new ResourceNotFoundException("Brand not found");
        }
        try {
            brandRepository.deleteById(id);
            brandRepository.flush();
        } catch (DataIntegrityViolationException e) {
            if (ConstraintViolationDetector.isConstraintViolated(e, "FK_products_brand")) {
                throw new ResourceConflictException("Brand cannot be deleted while it is used by products.");
            }
            throw e;
        }
    }

    @Transactional(readOnly = true)
    public List<BrandResponse> getAllBrands() {
        Sort sort = Sort.by(Sort.Direction.ASC, "sortOrder", "name");
        return brandRepository.findAll(sort).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public BrandResponse getBrandById(Long id) {
        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Brand not found"));
        return mapToResponse(brand);
    }

    @Transactional(readOnly = true)
    public List<BrandResponse> getPublicActiveBrands() {
        Sort sort = Sort.by(Sort.Direction.ASC, "sortOrder", "name");
        return brandRepository.findAll(sort).stream()
                .filter(Brand::isActive)
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public BrandResponse getPublicBrandBySlug(String slug) {
        Brand brand = brandRepository.findBySlugAndActiveTrue(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Brand not found"));
        return mapToResponse(brand);
    }

    private String normalizeName(String name) {
        if (name == null || name.isBlank()) {
            throw new InvalidRequestException("Brand name cannot be empty");
        }
        String normalized = name.trim().replaceAll("\\s+", " ");
        if (normalized.isBlank()) {
            throw new InvalidRequestException("Brand name cannot be empty");
        }
        if (normalized.length() > 120) {
            throw new InvalidRequestException("Brand name exceeds maximum length of 120 characters");
        }
        return normalized;
    }

    private void validateWebsiteUrl(String websiteUrl) {
        if (websiteUrl == null || websiteUrl.isBlank()) {
            return;
        }
        
        String url = websiteUrl.trim();
        try {
            URI uri = new URI(url);
            if (!uri.isAbsolute()) {
                throw new InvalidRequestException("Website URL must be absolute");
            }
            String scheme = uri.getScheme();
            if (scheme == null || (!scheme.equalsIgnoreCase("http") && !scheme.equalsIgnoreCase("https"))) {
                throw new InvalidRequestException("Website URL must use http or https scheme");
            }
            if (uri.getHost() == null || uri.getHost().isBlank()) {
                throw new InvalidRequestException("Website URL must have a meaningful host");
            }
        } catch (URISyntaxException e) {
            throw new InvalidRequestException("Invalid website URL format");
        }
    }

    private void handleBrandDataIntegrityViolation(DataIntegrityViolationException e) {
        if (ConstraintViolationDetector.isConstraintViolated(e, "UX_brands_name")) {
            throw new ResourceConflictException("Duplicate brand name");
        }
        if (ConstraintViolationDetector.isConstraintViolated(e, "UX_brands_slug")) {
            throw new ResourceConflictException("Duplicate brand slug");
        }
    }

    private BrandResponse mapToResponse(Brand brand) {
        return new BrandResponse(
                brand.getId(), brand.getName(), brand.getSlug(),
                brand.getDescription(), brand.getLogoUrl(), brand.getWebsiteUrl(),
                brand.getSortOrder(), brand.isActive(), brand.getSeoTitle(),
                brand.getSeoDescription(), brand.getCreatedAt(), brand.getUpdatedAt()
        );
    }
}
