package vn.homestore.api.catalog.attribute.api;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import org.hibernate.validator.constraints.Length;

public record UpdateAttributeValueRequest(
    @NotBlank
    @Length(max = 120)
    String value,
    
    @Length(max = 160)
    String slug,
    
    @NotNull
    @PositiveOrZero
    Integer sortOrder,
    
    @NotNull
    Boolean active
) {}
