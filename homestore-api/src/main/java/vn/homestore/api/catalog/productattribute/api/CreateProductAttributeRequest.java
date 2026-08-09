package vn.homestore.api.catalog.productattribute.api;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

public class CreateProductAttributeRequest {
    @NotNull
    @Positive
    private Long attributeId;

    @PositiveOrZero
    private Integer sortOrder;

    public Long getAttributeId() { return attributeId; }
    public void setAttributeId(Long attributeId) { this.attributeId = attributeId; }
    public Integer getSortOrder() { return sortOrder; }
    public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }
}
