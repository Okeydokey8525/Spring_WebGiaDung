package vn.homestore.api.catalog.productattribute.api;

import java.time.LocalDateTime;

public class ProductAttributeValueResponse {
    private Long id;
    private Long productAttributeId;
    private Long attributeValueId;
    private Integer sortOrder;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public ProductAttributeValueResponse(Long id, Long productAttributeId, Long attributeValueId, Integer sortOrder, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.productAttributeId = productAttributeId;
        this.attributeValueId = attributeValueId;
        this.sortOrder = sortOrder;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getId() { return id; }
    public Long getProductAttributeId() { return productAttributeId; }
    public Long getAttributeValueId() { return attributeValueId; }
    public Integer getSortOrder() { return sortOrder; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
