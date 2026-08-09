package vn.homestore.api.catalog.attribute.api;

import vn.homestore.api.catalog.attribute.domain.AttributeValue;

import java.time.LocalDateTime;

public record AttributeValueResponse(
    Long id,
    Long attributeId,
    String value,
    String slug,
    Integer sortOrder,
    boolean active,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {
    public static AttributeValueResponse from(AttributeValue attributeValue) {
        return new AttributeValueResponse(
            attributeValue.getId(),
            attributeValue.getAttributeId(),
            attributeValue.getValue(),
            attributeValue.getSlug(),
            attributeValue.getSortOrder(),
            attributeValue.isActive(),
            attributeValue.getCreatedAt(),
            attributeValue.getUpdatedAt()
        );
    }
}
