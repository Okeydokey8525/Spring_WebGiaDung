package vn.homestore.api.catalog.attribute.api;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import org.hibernate.validator.constraints.Length;

public record CreateAttributeRequest(
    @NotBlank
    @Length(max = 120)
    String name,
    
    @Length(max = 160)
    String slug,
    
    @Length(max = 1000)
    String description,
    
    @PositiveOrZero
    Integer sortOrder,
    
    Boolean active
) {}
