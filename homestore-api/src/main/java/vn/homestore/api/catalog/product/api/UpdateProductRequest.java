package vn.homestore.api.catalog.product.api;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import org.hibernate.validator.constraints.Length;
import vn.homestore.api.catalog.product.domain.ProductStatus;

public record UpdateProductRequest(
    @NotNull
    @Positive
    Long categoryId,
    
    @Positive
    Long brandId,
    
    @NotBlank
    @Length(max = 200)
    String name,
    
    @Length(max = 220)
    String slug,
    
    @Length(max = 500)
    String shortDescription,
    
    String description,
    
    @NotNull
    ProductStatus status,
    
    @Length(max = 160)
    String seoTitle,
    
    @Length(max = 320)
    String seoDescription
) {}
