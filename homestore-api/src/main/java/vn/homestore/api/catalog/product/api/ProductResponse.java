package vn.homestore.api.catalog.product.api;

import vn.homestore.api.catalog.product.domain.Product;
import vn.homestore.api.catalog.product.domain.ProductStatus;

import java.time.LocalDateTime;

public record ProductResponse(
    Long id,
    Long categoryId,
    Long brandId,
    String name,
    String slug,
    String shortDescription,
    String description,
    ProductStatus status,
    String seoTitle,
    String seoDescription,
    LocalDateTime createdAt,
    LocalDateTime updatedAt,
    LocalDateTime archivedAt
) {
    public static ProductResponse from(Product product) {
        return new ProductResponse(
            product.getId(),
            product.getCategoryId(),
            product.getBrandId(),
            product.getName(),
            product.getSlug(),
            product.getShortDescription(),
            product.getDescription(),
            product.getStatus(),
            product.getSeoTitle(),
            product.getSeoDescription(),
            product.getCreatedAt(),
            product.getUpdatedAt(),
            product.getArchivedAt()
        );
    }
}
