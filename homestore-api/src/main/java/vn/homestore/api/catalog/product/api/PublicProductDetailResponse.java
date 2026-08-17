package vn.homestore.api.catalog.product.api;

import vn.homestore.api.catalog.product.domain.Product;

public record PublicProductDetailResponse(
        Long id,
        Long categoryId,
        Long brandId,
        String name,
        String slug,
        String shortDescription,
        String description,
        String seoTitle,
        String seoDescription
) {

    public static PublicProductDetailResponse from(Product product) {
        return new PublicProductDetailResponse(
                product.getId(),
                product.getCategoryId(),
                product.getBrandId(),
                product.getName(),
                product.getSlug(),
                product.getShortDescription(),
                product.getDescription(),
                product.getSeoTitle(),
                product.getSeoDescription()
        );
    }
}
