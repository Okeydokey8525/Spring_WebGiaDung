package vn.homestore.api.common.text;

import java.text.Normalizer;
import java.util.Locale;

public final class SlugNormalizer {

    private SlugNormalizer() {
        // Utility class
    }

    public static String normalize(String source) {
        if (source == null || source.isBlank()) {
            return "";
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

        return slug;
    }
}
