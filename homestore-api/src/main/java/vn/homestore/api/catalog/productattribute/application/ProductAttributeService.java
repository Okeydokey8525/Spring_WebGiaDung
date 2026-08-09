package vn.homestore.api.catalog.productattribute.application;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.homestore.api.catalog.attribute.infrastructure.AttributeRepository;
import vn.homestore.api.catalog.attribute.infrastructure.AttributeValueRepository;
import vn.homestore.api.catalog.attribute.domain.AttributeValue;
import vn.homestore.api.catalog.product.domain.Product;
import vn.homestore.api.catalog.product.domain.ProductStatus;
import vn.homestore.api.catalog.product.infrastructure.ProductRepository;
import vn.homestore.api.catalog.productattribute.api.*;
import vn.homestore.api.catalog.productattribute.domain.ProductAttribute;
import vn.homestore.api.catalog.productattribute.domain.ProductAttributeValue;
import vn.homestore.api.catalog.productattribute.infrastructure.ProductAttributeRepository;
import vn.homestore.api.catalog.productattribute.infrastructure.ProductAttributeValueRepository;
import vn.homestore.api.common.error.InvalidRequestException;
import vn.homestore.api.common.error.ResourceConflictException;
import vn.homestore.api.common.error.ResourceNotFoundException;
import vn.homestore.api.common.persistence.ConstraintViolationDetector;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProductAttributeService {

    private final ProductAttributeRepository productAttributeRepository;
    private final ProductAttributeValueRepository productAttributeValueRepository;
    private final ProductRepository productRepository;
    private final AttributeRepository attributeRepository;
    private final AttributeValueRepository attributeValueRepository;

    public ProductAttributeService(
            ProductAttributeRepository productAttributeRepository,
            ProductAttributeValueRepository productAttributeValueRepository,
            ProductRepository productRepository,
            AttributeRepository attributeRepository,
            AttributeValueRepository attributeValueRepository) {
        this.productAttributeRepository = productAttributeRepository;
        this.productAttributeValueRepository = productAttributeValueRepository;
        this.productRepository = productRepository;
        this.attributeRepository = attributeRepository;
        this.attributeValueRepository = attributeValueRepository;
    }

    private Product getActiveProduct(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        if (product.getStatus() == ProductStatus.ARCHIVED) {
            throw new ResourceConflictException("Archived products cannot have attribute assignments modified.");
        }
        return product;
    }

    public ProductAttributeResponse assignAttribute(Long productId, CreateProductAttributeRequest request) {
        getActiveProduct(productId);
        
        if (!attributeRepository.existsById(request.getAttributeId())) {
            throw new ResourceNotFoundException("Attribute not found");
        }

        ProductAttribute pa = new ProductAttribute(productId, request.getAttributeId(), request.getSortOrder() != null ? request.getSortOrder() : 0);
        try {
            pa = productAttributeRepository.saveAndFlush(pa);
        } catch (DataIntegrityViolationException ex) {
            if (ConstraintViolationDetector.isConstraintViolated(ex, "UX_product_attributes_product_attribute")) {
                throw new ResourceConflictException("Product already has this attribute assigned.");
            }
            throw ex;
        }

        return toResponse(pa);
    }

    public List<ProductAttributeResponse> getAttributesByProduct(Long productId) {
        if (!productRepository.existsById(productId)) {
            throw new ResourceNotFoundException("Product not found");
        }
        return productAttributeRepository.findAllByProductIdOrderBySortOrderAscAttributeIdAsc(productId)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public ProductAttributeResponse getAttributeAssignment(Long productId, Long assignmentId) {
        ProductAttribute pa = productAttributeRepository.findByIdAndProductId(assignmentId, productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product attribute assignment not found"));
        return toResponse(pa);
    }

    public ProductAttributeResponse updateAttributeAssignment(Long productId, Long assignmentId, UpdateProductAttributeRequest request) {
        getActiveProduct(productId);
        ProductAttribute pa = productAttributeRepository.findByIdAndProductId(assignmentId, productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product attribute assignment not found"));
        
        pa.setSortOrder(request.getSortOrder());
        return toResponse(pa);
    }

    public void deleteAttributeAssignment(Long productId, Long assignmentId) {
        getActiveProduct(productId);
        ProductAttribute pa = productAttributeRepository.findByIdAndProductId(assignmentId, productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product attribute assignment not found"));

        if (productAttributeValueRepository.existsByProductAttributeId(assignmentId)) {
            throw new ResourceConflictException("Product attribute cannot be removed while assigned values exist.");
        }

        try {
            productAttributeRepository.delete(pa);
            productAttributeRepository.flush();
        } catch (DataIntegrityViolationException ex) {
            if (ConstraintViolationDetector.isConstraintViolated(ex, "FK_product_attribute_values_product_attribute")) {
                throw new ResourceConflictException("Product attribute cannot be removed while assigned values exist.");
            }
            throw ex;
        }
    }

    public ProductAttributeValueResponse assignValue(Long productId, Long assignmentId, CreateProductAttributeValueRequest request) {
        getActiveProduct(productId);
        ProductAttribute pa = productAttributeRepository.findByIdAndProductId(assignmentId, productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product attribute assignment not found"));
        
        AttributeValue av = attributeValueRepository.findById(request.getAttributeValueId())
                .orElseThrow(() -> new ResourceNotFoundException("Attribute value not found"));
        
        if (!av.getAttributeId().equals(pa.getAttributeId())) {
            throw new InvalidRequestException("Attribute value does not belong to the assigned attribute.");
        }

        ProductAttributeValue pav = new ProductAttributeValue(assignmentId, av.getId(), request.getSortOrder() != null ? request.getSortOrder() : 0);
        try {
            pav = productAttributeValueRepository.saveAndFlush(pav);
        } catch (DataIntegrityViolationException ex) {
            if (ConstraintViolationDetector.isConstraintViolated(ex, "UX_product_attribute_values_assignment_value")) {
                throw new ResourceConflictException("Product attribute already has this value assigned.");
            }
            throw ex;
        }
        return toValueResponse(pav);
    }

    public List<ProductAttributeValueResponse> getValuesByAssignment(Long productId, Long assignmentId) {
        if (!productRepository.existsById(productId)) {
            throw new ResourceNotFoundException("Product not found");
        }
        if (!productAttributeRepository.existsByIdAndProductId(assignmentId, productId)) {
            throw new ResourceNotFoundException("Product attribute assignment not found");
        }
        return productAttributeValueRepository.findAllByProductAttributeIdOrderBySortOrderAscAttributeValueIdAsc(assignmentId)
                .stream().map(this::toValueResponse).collect(Collectors.toList());
    }

    public ProductAttributeValueResponse getValueAssignment(Long productId, Long assignmentId, Long valueAssignmentId) {
        if (!productAttributeRepository.existsByIdAndProductId(assignmentId, productId)) {
            throw new ResourceNotFoundException("Product attribute assignment not found");
        }
        ProductAttributeValue pav = productAttributeValueRepository.findByIdAndProductAttributeId(valueAssignmentId, assignmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Product attribute value assignment not found"));
        return toValueResponse(pav);
    }

    public ProductAttributeValueResponse updateValueAssignment(Long productId, Long assignmentId, Long valueAssignmentId, UpdateProductAttributeValueRequest request) {
        getActiveProduct(productId);
        if (!productAttributeRepository.existsByIdAndProductId(assignmentId, productId)) {
            throw new ResourceNotFoundException("Product attribute assignment not found");
        }
        ProductAttributeValue pav = productAttributeValueRepository.findByIdAndProductAttributeId(valueAssignmentId, assignmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Product attribute value assignment not found"));
        pav.setSortOrder(request.getSortOrder());
        return toValueResponse(pav);
    }

    public void deleteValueAssignment(Long productId, Long assignmentId, Long valueAssignmentId) {
        getActiveProduct(productId);
        if (!productAttributeRepository.existsByIdAndProductId(assignmentId, productId)) {
            throw new ResourceNotFoundException("Product attribute assignment not found");
        }
        ProductAttributeValue pav = productAttributeValueRepository.findByIdAndProductAttributeId(valueAssignmentId, assignmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Product attribute value assignment not found"));
        productAttributeValueRepository.delete(pav);
        productAttributeValueRepository.flush();
    }

    private ProductAttributeResponse toResponse(ProductAttribute pa) {
        return new ProductAttributeResponse(pa.getId(), pa.getProductId(), pa.getAttributeId(), pa.getSortOrder(), pa.getCreatedAt(), pa.getUpdatedAt());
    }

    private ProductAttributeValueResponse toValueResponse(ProductAttributeValue pav) {
        return new ProductAttributeValueResponse(pav.getId(), pav.getProductAttributeId(), pav.getAttributeValueId(), pav.getSortOrder(), pav.getCreatedAt(), pav.getUpdatedAt());
    }
}
