package vn.homestore.api.catalog.productattribute.api;

import java.time.LocalDateTime;

public class ProductAttributeResponse {
    private Long id;
    private Long productId;
    private Long attributeId;
    private Integer sortOrder;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public ProductAttributeResponse(Long id, Long productId, Long attributeId, Integer sortOrder, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.productId = productId;
        this.attributeId = attributeId;
        this.sortOrder = sortOrder;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getId() { return id; }
    public Long getProductId() { return productId; }
    public Long getAttributeId() { return attributeId; }
    public Integer getSortOrder() { return sortOrder; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
