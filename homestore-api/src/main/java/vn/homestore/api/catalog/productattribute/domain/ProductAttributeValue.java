package vn.homestore.api.catalog.productattribute.domain;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "product_attribute_values")
public class ProductAttributeValue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "product_attribute_id", nullable = false)
    private Long productAttributeId;

    @Column(name = "attribute_value_id", nullable = false)
    private Long attributeValueId;

    @Column(name = "sort_order", nullable = false)
    private Integer sortOrder;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    public ProductAttributeValue() {}

    public ProductAttributeValue(Long productAttributeId, Long attributeValueId, Integer sortOrder) {
        this.productAttributeId = productAttributeId;
        this.attributeValueId = attributeValueId;
        this.sortOrder = sortOrder;
    }

    public Long getId() { return id; }
    public Long getProductAttributeId() { return productAttributeId; }
    public Long getAttributeValueId() { return attributeValueId; }
    public Integer getSortOrder() { return sortOrder; }
    public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = this.createdAt;
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
