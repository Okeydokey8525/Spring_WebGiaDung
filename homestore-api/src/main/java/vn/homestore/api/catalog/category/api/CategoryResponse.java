package vn.homestore.api.catalog.category.api;

import java.time.LocalDateTime;

public record CategoryResponse(
    Long id,
    Long parentId,
    String name,
    String slug,
    String description,
    String imageUrl,
    Integer sortOrder,
    boolean active,
    String seoTitle,
    String seoDescription,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {}
