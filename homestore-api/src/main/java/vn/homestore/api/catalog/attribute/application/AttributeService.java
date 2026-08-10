package vn.homestore.api.catalog.attribute.application;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.homestore.api.catalog.attribute.api.CreateAttributeRequest;
import vn.homestore.api.catalog.attribute.api.CreateAttributeValueRequest;
import vn.homestore.api.catalog.attribute.api.UpdateAttributeRequest;
import vn.homestore.api.catalog.attribute.api.UpdateAttributeValueRequest;
import vn.homestore.api.catalog.attribute.domain.Attribute;
import vn.homestore.api.catalog.attribute.domain.AttributeValue;
import vn.homestore.api.catalog.attribute.infrastructure.AttributeRepository;
import vn.homestore.api.catalog.attribute.infrastructure.AttributeValueRepository;
import vn.homestore.api.common.error.ResourceConflictException;
import vn.homestore.api.common.error.ResourceNotFoundException;
import vn.homestore.api.common.persistence.ConstraintViolationDetector;
import org.springframework.dao.DataIntegrityViolationException;

import java.util.List;

@Service
@Transactional
public class AttributeService {

    private final AttributeRepository attributeRepository;
    private final AttributeValueRepository attributeValueRepository;
    private final AttributeSlugService attributeSlugService;

    public AttributeService(AttributeRepository attributeRepository,
                            AttributeValueRepository attributeValueRepository,
                            AttributeSlugService attributeSlugService) {
        this.attributeRepository = attributeRepository;
        this.attributeValueRepository = attributeValueRepository;
        this.attributeSlugService = attributeSlugService;
    }

    public Attribute createAttribute(CreateAttributeRequest request) {
        String normalizedName = normalizeWhitespace(request.name());
        String slug = attributeSlugService.generateOrNormalizeAttributeSlug(normalizedName, request.slug());

        if (attributeRepository.existsByName(normalizedName)) {
            throw new ResourceConflictException("Attribute name already exists: " + normalizedName);
        }
        if (attributeRepository.existsBySlug(slug)) {
            throw new ResourceConflictException("Attribute slug already exists: " + slug);
        }

        Attribute attribute = new Attribute(
                normalizedName,
                slug,
                request.description(),
                request.sortOrder(),
                request.active() != null ? request.active() : true
        );

        return saveAttribute(attribute);
    }

    public Attribute updateAttribute(Long id, UpdateAttributeRequest request) {
        Attribute attribute = getAttributeOrThrow(id);

        String normalizedName = normalizeWhitespace(request.name());
        String slug = attributeSlugService.generateOrNormalizeAttributeSlug(normalizedName, request.slug());

        if (attributeRepository.existsByNameAndIdNot(normalizedName, id)) {
            throw new ResourceConflictException("Attribute name already exists: " + normalizedName);
        }
        if (attributeRepository.existsBySlugAndIdNot(slug, id)) {
            throw new ResourceConflictException("Attribute slug already exists: " + slug);
        }

        attribute.update(
                normalizedName,
                slug,
                request.description(),
                request.sortOrder(),
                request.active()
        );

        return saveAttribute(attribute);
    }

    public void deleteAttribute(Long id) {
        Attribute attribute = getAttributeOrThrow(id);

        if (attributeValueRepository.existsByAttributeId(id)) {
            throw new ResourceConflictException("Attribute cannot be deleted while it has values.");
        }

        try {
            attributeRepository.delete(attribute);
            attributeRepository.flush();
        } catch (DataIntegrityViolationException e) {
            if (ConstraintViolationDetector.isConstraintViolated(e, "FK_attribute_values_attribute")) {
                throw new ResourceConflictException("Attribute cannot be deleted while it has values.");
            }
            if (ConstraintViolationDetector.isConstraintViolated(e, "FK_product_attributes_attribute")) {
                throw new ResourceConflictException("Attribute cannot be deleted while it is assigned to products.");
            }
            throw e;
        }
    }

    @Transactional(readOnly = true)
    public List<Attribute> findAllAttributes() {
        return attributeRepository.findAll(Sort.by(Sort.Direction.ASC, "sortOrder", "name"));
    }

    @Transactional(readOnly = true)
    public Attribute getAttributeOrThrow(Long id) {
        return attributeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Attribute not found"));
    }

    public boolean existsById(Long id) {
        return attributeRepository.existsById(id);
    }

    public AttributeValue createAttributeValue(Long attributeId, CreateAttributeValueRequest request) {
        if (!attributeRepository.existsById(attributeId)) {
            throw new ResourceNotFoundException("Attribute not found: " + attributeId);
        }

        String normalizedValue = normalizeWhitespace(request.value());
        String slug = attributeSlugService.generateOrNormalizeValueSlug(normalizedValue, request.slug());

        if (attributeValueRepository.existsByAttributeIdAndValue(attributeId, normalizedValue)) {
            throw new ResourceConflictException("Attribute value already exists in this attribute: " + normalizedValue);
        }
        if (attributeValueRepository.existsByAttributeIdAndSlug(attributeId, slug)) {
            throw new ResourceConflictException("Attribute value slug already exists in this attribute: " + slug);
        }

        AttributeValue value = new AttributeValue(
                attributeId,
                normalizedValue,
                slug,
                request.sortOrder(),
                request.active() != null ? request.active() : true
        );

        return saveAttributeValue(value);
    }

    public AttributeValue updateAttributeValue(Long attributeId, Long valueId, UpdateAttributeValueRequest request) {
        if (!attributeRepository.existsById(attributeId)) {
            throw new ResourceNotFoundException("Attribute not found: " + attributeId);
        }

        AttributeValue value = attributeValueRepository.findByIdAndAttributeId(valueId, attributeId)
                .orElseThrow(() -> new ResourceNotFoundException("Attribute value not found: " + valueId + " in attribute: " + attributeId));

        String normalizedValue = normalizeWhitespace(request.value());
        String slug = attributeSlugService.generateOrNormalizeValueSlug(normalizedValue, request.slug());

        if (attributeValueRepository.existsByAttributeIdAndValueAndIdNot(attributeId, normalizedValue, valueId)) {
            throw new ResourceConflictException("Attribute value already exists in this attribute: " + normalizedValue);
        }
        if (attributeValueRepository.existsByAttributeIdAndSlugAndIdNot(attributeId, slug, valueId)) {
            throw new ResourceConflictException("Attribute value slug already exists in this attribute: " + slug);
        }

        value.update(
                normalizedValue,
                slug,
                request.sortOrder(),
                request.active()
        );

        return saveAttributeValue(value);
    }

    public void deleteAttributeValue(Long attributeId, Long valueId) {
        if (!attributeRepository.existsById(attributeId)) {
            throw new ResourceNotFoundException("Attribute not found: " + attributeId);
        }

        AttributeValue value = attributeValueRepository.findByIdAndAttributeId(valueId, attributeId)
                .orElseThrow(() -> new ResourceNotFoundException("Attribute value not found: " + valueId + " in attribute: " + attributeId));

        try {
            attributeValueRepository.delete(value);
            attributeValueRepository.flush();
        } catch (DataIntegrityViolationException e) {
            if (ConstraintViolationDetector.isConstraintViolated(e, "FK_product_attribute_values_attribute_value")) {
                throw new ResourceConflictException("Attribute value cannot be deleted while it is assigned to products.");
            }
            throw e;
        }
    }

    @Transactional(readOnly = true)
    public List<AttributeValue> findValuesByAttributeId(Long attributeId) {
        if (!attributeRepository.existsById(attributeId)) {
            throw new ResourceNotFoundException("Attribute not found: " + attributeId);
        }
        return attributeValueRepository.findAllByAttributeId(attributeId, Sort.by(Sort.Direction.ASC, "sortOrder", "value"));
    }

    @Transactional(readOnly = true)
    public AttributeValue getValueOrThrow(Long attributeId, Long valueId) {
        return attributeValueRepository.findByIdAndAttributeId(valueId, attributeId)
                .orElseThrow(() -> new ResourceNotFoundException("Attribute value not found"));
    }

    public AttributeValue getAttributeValueOrThrow(Long valueId) {
        return attributeValueRepository.findById(valueId)
                .orElseThrow(() -> new ResourceNotFoundException("Attribute value not found"));
    }

    private Attribute saveAttribute(Attribute attribute) {
        try {
            return attributeRepository.saveAndFlush(attribute);
        } catch (DataIntegrityViolationException e) {
            if (ConstraintViolationDetector.isConstraintViolated(e, "UX_attributes_name")) {
                throw new ResourceConflictException("Attribute name already exists: " + attribute.getName());
            }
            if (ConstraintViolationDetector.isConstraintViolated(e, "UX_attributes_slug")) {
                throw new ResourceConflictException("Attribute slug already exists: " + attribute.getSlug());
            }
            throw e;
        }
    }

    private AttributeValue saveAttributeValue(AttributeValue value) {
        try {
            return attributeValueRepository.saveAndFlush(value);
        } catch (DataIntegrityViolationException e) {
            if (ConstraintViolationDetector.isConstraintViolated(e, "FK_attribute_values_attribute")) {
                throw new ResourceConflictException("Parent attribute was deleted or does not exist");
            }
            if (ConstraintViolationDetector.isConstraintViolated(e, "UX_attribute_values_attribute_value")) {
                throw new ResourceConflictException("Attribute value already exists in this attribute: " + value.getValue());
            }
            if (ConstraintViolationDetector.isConstraintViolated(e, "UX_attribute_values_attribute_slug")) {
                throw new ResourceConflictException("Attribute value slug already exists in this attribute: " + value.getSlug());
            }
            throw e;
        }
    }

    private String normalizeWhitespace(String value) {
        if (value == null) {
            return null;
        }
        return value.trim().replaceAll("\\s+", " ");
    }
}
