package vn.homestore.api.catalog.brand.api;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Min;

public record UpdateBrandRequest(
    @NotBlank
    @Size(max = 120)
    String name,

    @Size(max = 160)
    String slug,

    @Size(max = 1000)
    String description,

    @Size(max = 500)
    String logoUrl,

    @Size(max = 500)
    String websiteUrl,

    @NotNull
    @Min(0)
    Integer sortOrder,

    @NotNull
    Boolean active,

    @Size(max = 160)
    String seoTitle,

    @Size(max = 320)
    String seoDescription
) {}
