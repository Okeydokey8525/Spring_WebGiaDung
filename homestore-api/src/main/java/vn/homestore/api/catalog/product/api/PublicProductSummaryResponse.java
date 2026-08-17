package vn.homestore.api.catalog.product.api;

import vn.homestore.api.catalog.product.domain.Product;

public record PublicProductSummaryResponse(
        Long id,
        Long categoryId,
        Long brandId,
        String name,
        String slug,
        String shortDescription
) {

    public static PublicProductSummaryResponse from(Product product) {
        return new PublicProductSummaryResponse(
                product.getId(),
                product.getCategoryId(),
                product.getBrandId(),
                product.getName(),
                product.getSlug(),
                product.getShortDescription()
        );
    }
}
