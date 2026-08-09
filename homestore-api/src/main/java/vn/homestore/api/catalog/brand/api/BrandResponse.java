package vn.homestore.api.catalog.brand.api;

import java.time.LocalDateTime;

public record BrandResponse(
    Long id,
    String name,
    String slug,
    String description,
    String logoUrl,
    String websiteUrl,
    Integer sortOrder,
    boolean active,
    String seoTitle,
    String seoDescription,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {}
