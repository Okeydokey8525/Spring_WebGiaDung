package vn.homestore.api.catalog.attribute.application;

import org.springframework.stereotype.Service;
import vn.homestore.api.common.error.InvalidRequestException;
import vn.homestore.api.common.text.SlugNormalizer;

@Service
public class AttributeSlugService {

    public String generateOrNormalizeAttributeSlug(String candidateName, String candidateSlug) {
        String base = (candidateSlug == null || candidateSlug.isBlank()) ? candidateName : candidateSlug;
        String normalized = SlugNormalizer.normalize(base);

        if (normalized.isEmpty()) {
            throw new InvalidRequestException("Attribute slug cannot be derived or empty");
        }
        
        if (normalized.length() > 160) {
            throw new InvalidRequestException("Attribute slug length exceeds maximum allowed 160 characters");
        }

        return normalized;
    }
    
    public String generateOrNormalizeValueSlug(String candidateValue, String candidateSlug) {
        String base = (candidateSlug == null || candidateSlug.isBlank()) ? candidateValue : candidateSlug;
        String normalized = SlugNormalizer.normalize(base);

        if (normalized.isEmpty()) {
            throw new InvalidRequestException("Attribute value slug cannot be derived or empty");
        }
        
        if (normalized.length() > 160) {
            throw new InvalidRequestException("Attribute value slug length exceeds maximum allowed 160 characters");
        }

        return normalized;
    }
}
