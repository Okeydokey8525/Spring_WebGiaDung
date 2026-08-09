package vn.homestore.api.catalog.category.api;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record UpdateCategoryRequest(
    @NotBlank(message = "Category name must not be blank")
    @Size(max = 120, message = "Category name must not exceed 120 characters")
    String name,

    @Size(max = 160, message = "Slug must not exceed 160 characters")
    String slug,

    Long parentId,

    @Size(max = 1000, message = "Description must not exceed 1000 characters")
    String description,

    @Size(max = 500, message = "Image URL must not exceed 500 characters")
    String imageUrl,

    @NotNull(message = "Sort order is required")
    @Min(value = 0, message = "Sort order must be non-negative")
    Integer sortOrder,

    @NotNull(message = "Active status is required")
    Boolean active,

    @Size(max = 160, message = "SEO Title must not exceed 160 characters")
    String seoTitle,

    @Size(max = 320, message = "SEO Description must not exceed 320 characters")
    String seoDescription
) {}
