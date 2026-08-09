package vn.homestore.api.catalog.productattribute.api;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

public class CreateProductAttributeValueRequest {
    @NotNull
    @Positive
    private Long attributeValueId;

    @PositiveOrZero
    private Integer sortOrder;

    public Long getAttributeValueId() { return attributeValueId; }
    public void setAttributeValueId(Long attributeValueId) { this.attributeValueId = attributeValueId; }
    public Integer getSortOrder() { return sortOrder; }
    public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }
}
