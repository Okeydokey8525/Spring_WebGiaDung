package vn.homestore.api.catalog.attribute.api;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import org.hibernate.validator.constraints.Length;

public record UpdateAttributeRequest(
    @NotBlank
    @Length(max = 120)
    String name,
    
    @Length(max = 160)
    String slug,
    
    @Length(max = 1000)
    String description,
    
    @NotNull
    @PositiveOrZero
    Integer sortOrder,
    
    @NotNull
    Boolean active
) {}
