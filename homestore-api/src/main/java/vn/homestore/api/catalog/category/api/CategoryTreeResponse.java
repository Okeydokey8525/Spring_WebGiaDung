package vn.homestore.api.catalog.category.api;

import java.util.List;
import java.util.ArrayList;

public record CategoryTreeResponse(
    Long id,
    String name,
    String slug,
    String imageUrl,
    Integer sortOrder,
    List<CategoryTreeResponse> children
) {
    public CategoryTreeResponse(Long id, String name, String slug, String imageUrl, Integer sortOrder) {
        this(id, name, slug, imageUrl, sortOrder, new ArrayList<>());
    }
}
