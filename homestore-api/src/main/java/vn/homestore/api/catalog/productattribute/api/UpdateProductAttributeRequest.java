package vn.homestore.api.catalog.productattribute.api;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public class UpdateProductAttributeRequest {
    @NotNull
    @PositiveOrZero
    private Integer sortOrder;

    public Integer getSortOrder() { return sortOrder; }
    public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }
}
