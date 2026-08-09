package vn.homestore.api.catalog.attribute.domain;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "attribute_values")
public class AttributeValue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "attribute_id", nullable = false)
    private Long attributeId;

    @Column(nullable = false, length = 120)
    private String value;

    @Column(nullable = false, length = 160)
    private String slug;

    @Column(name = "sort_order", nullable = false)
    private Integer sortOrder;

    @Column(name = "is_active", nullable = false)
    private boolean active;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    protected AttributeValue() {
        // JPA
    }

    public AttributeValue(Long attributeId, String value, String slug, Integer sortOrder, boolean active) {
        this.attributeId = attributeId;
        this.value = value;
        this.slug = slug;
        this.sortOrder = sortOrder != null ? sortOrder : 0;
        this.active = active;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = this.createdAt;
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public void update(String value, String slug, Integer sortOrder, boolean active) {
        this.value = value;
        this.slug = slug;
        this.sortOrder = sortOrder;
        this.active = active;
    }

    public Long getId() {
        return id;
    }

    public Long getAttributeId() {
        return attributeId;
    }

    public String getValue() {
        return value;
    }

    public String getSlug() {
        return slug;
    }

    public Integer getSortOrder() {
        return sortOrder;
    }

    public boolean isActive() {
        return active;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof AttributeValue attributeValue)) return false;
        return id != null && id.equals(attributeValue.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
