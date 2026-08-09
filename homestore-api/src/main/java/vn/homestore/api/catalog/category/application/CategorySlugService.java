package vn.homestore.api.catalog.category.application;

import org.springframework.stereotype.Service;
import vn.homestore.api.common.error.InvalidRequestException;

import java.text.Normalizer;
import java.util.Locale;

@Service
public class CategorySlugService {

    public String generateSlug(String source) {
        if (source == null || source.isBlank()) {
            throw new InvalidRequestException("Cannot generate slug from empty string");
        }

        String slug = source.trim().toLowerCase(Locale.ROOT);
        
        // Handle Vietnamese characters
        slug = slug.replace("đ", "d").replace("đ", "d");
        
        // Normalize unicode and remove accents
        slug = Normalizer.normalize(slug, Normalizer.Form.NFD);
        slug = slug.replaceAll("\\p{InCombiningDiacriticalMarks}+", "");
        
        // Replace non-alphanumeric characters with hyphens
        slug = slug.replaceAll("[^a-z0-9]+", "-");
        
        // Trim hyphens
        slug = slug.replaceAll("^-+|-+$", "");

        if (slug.isBlank()) {
            throw new InvalidRequestException("Resulting slug is empty");
        }

        if (slug.length() > 160) {
            throw new InvalidRequestException("Resulting slug exceeds maximum length of 160 characters");
        }

        return slug;
    }
}
