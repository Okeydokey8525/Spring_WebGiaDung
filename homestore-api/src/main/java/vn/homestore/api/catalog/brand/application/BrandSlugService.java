package vn.homestore.api.catalog.brand.application;

import org.springframework.stereotype.Service;
import vn.homestore.api.common.error.InvalidRequestException;
import vn.homestore.api.common.text.SlugNormalizer;

@Service
public class BrandSlugService {

    public String generateSlug(String source) {
        if (source == null || source.isBlank()) {
            throw new InvalidRequestException("Cannot generate slug from empty string");
        }

        String slug = SlugNormalizer.normalize(source);

        if (slug.isBlank()) {
            throw new InvalidRequestException("Resulting slug is empty");
        }

        if (slug.length() > 160) {
            throw new InvalidRequestException("Resulting slug exceeds maximum length of 160 characters");
        }

        return slug;
    }
}
