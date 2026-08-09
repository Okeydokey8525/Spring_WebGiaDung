package vn.homestore.api.catalog.attribute.api;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import org.hibernate.validator.constraints.Length;

public record CreateAttributeValueRequest(
    @NotBlank
    @Length(max = 120)
    String value,
    
    @Length(max = 160)
    String slug,
    
    @PositiveOrZero
    Integer sortOrder,
    
    Boolean active
) {}
