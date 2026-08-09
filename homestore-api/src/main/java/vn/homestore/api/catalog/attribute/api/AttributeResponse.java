package vn.homestore.api.catalog.attribute.api;

import vn.homestore.api.catalog.attribute.domain.Attribute;

import java.time.LocalDateTime;

public record AttributeResponse(
    Long id,
    String name,
    String slug,
    String description,
    Integer sortOrder,
    boolean active,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {
    public static AttributeResponse from(Attribute attribute) {
        return new AttributeResponse(
            attribute.getId(),
            attribute.getName(),
            attribute.getSlug(),
            attribute.getDescription(),
            attribute.getSortOrder(),
            attribute.isActive(),
            attribute.getCreatedAt(),
            attribute.getUpdatedAt()
        );
    }
}
