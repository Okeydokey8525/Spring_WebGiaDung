package vn.homestore.api.catalog.product.api;

import java.util.List;

public record PublicProductPageResponse(
        List<PublicProductSummaryResponse> items,
        int page,
        int size,
        long totalElements,
        int totalPages
) {
}
