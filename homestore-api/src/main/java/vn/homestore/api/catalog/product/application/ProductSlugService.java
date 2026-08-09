package vn.homestore.api.catalog.product.application;

import org.springframework.stereotype.Service;
import vn.homestore.api.common.error.InvalidRequestException;
import vn.homestore.api.common.text.SlugNormalizer;

@Service
public class ProductSlugService {

    public String determineSlug(String requestSlug, String productName) {
        String base = (requestSlug == null || requestSlug.trim().isEmpty()) ? productName : requestSlug;
        String normalized = SlugNormalizer.normalize(base);
        
        if (normalized.isEmpty()) {
            throw new InvalidRequestException("Cannot generate a valid slug from the provided input");
        }
        
        if (normalized.length() > 220) {
            normalized = normalized.substring(0, 220);
            if (normalized.endsWith("-")) {
                normalized = normalized.substring(0, normalized.length() - 1);
            }
        }
        
        return normalized;
    }
}
