package vn.homestore.api.catalog.productattribute.application;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.homestore.api.catalog.attribute.application.AttributeService;
import vn.homestore.api.catalog.attribute.domain.AttributeValue;
import vn.homestore.api.catalog.product.application.ProductService;
import vn.homestore.api.catalog.product.domain.Product;
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
    private final ProductService productService;
    private final AttributeService attributeService;

    public ProductAttributeService(
            ProductAttributeRepository productAttributeRepository,
            ProductAttributeValueRepository productAttributeValueRepository,
            ProductService productService,
            AttributeService attributeService) {
        this.productAttributeRepository = productAttributeRepository;
        this.productAttributeValueRepository = productAttributeValueRepository;
        this.productService = productService;
        this.attributeService = attributeService;
    }

    public ProductAttributeResponse assignAttribute(Long productId, CreateProductAttributeRequest request) {
        productService.getActiveProductOrThrow(productId);
        
        if (!attributeService.existsById(request.getAttributeId())) {
            throw new ResourceNotFoundException("Attribute not found");
        }

        ProductAttribute pa = new ProductAttribute(productId, request.getAttributeId(), request.getSortOrder() != null ? request.getSortOrder() : 0);
        try {
            pa = productAttributeRepository.saveAndFlush(pa);
        } catch (DataIntegrityViolationException ex) {
            if (ConstraintViolationDetector.isConstraintViolated(ex, "UX_product_attributes_product_attribute")) {
                throw new ResourceConflictException("Product already has this attribute assigned.");
            }
            if (ConstraintViolationDetector.isConstraintViolated(ex, "FK_product_attributes_product")) {
                throw new ResourceConflictException("Product does not exist.");
            }
            if (ConstraintViolationDetector.isConstraintViolated(ex, "FK_product_attributes_attribute")) {
                throw new ResourceConflictException("Attribute does not exist.");
            }
            throw ex;
        }

        return toResponse(pa);
    }

    public List<ProductAttributeResponse> getAttributesByProduct(Long productId) {
        if (!productService.existsById(productId)) {
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
        productService.getActiveProductOrThrow(productId);
        ProductAttribute pa = productAttributeRepository.findByIdAndProductId(assignmentId, productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product attribute assignment not found"));
        
        pa.setSortOrder(request.getSortOrder());
        pa = productAttributeRepository.saveAndFlush(pa);
        return toResponse(pa);
    }

    public void deleteAttributeAssignment(Long productId, Long assignmentId) {
        productService.getActiveProductOrThrow(productId);
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
        productService.getActiveProductOrThrow(productId);
        ProductAttribute pa = productAttributeRepository.findByIdAndProductId(assignmentId, productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product attribute assignment not found"));
        
        AttributeValue av = attributeService.getAttributeValueOrThrow(request.getAttributeValueId());
        
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
            if (ConstraintViolationDetector.isConstraintViolated(ex, "FK_product_attribute_values_product_attribute")) {
                throw new ResourceConflictException("Product attribute assignment does not exist.");
            }
            if (ConstraintViolationDetector.isConstraintViolated(ex, "FK_product_attribute_values_attribute_value")) {
                throw new ResourceConflictException("Attribute value does not exist.");
            }
            throw ex;
        }
        return toValueResponse(pav);
    }

    public List<ProductAttributeValueResponse> getValuesByAssignment(Long productId, Long assignmentId) {
        if (!productService.existsById(productId)) {
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
        productService.getActiveProductOrThrow(productId);
        if (!productAttributeRepository.existsByIdAndProductId(assignmentId, productId)) {
            throw new ResourceNotFoundException("Product attribute assignment not found");
        }
        ProductAttributeValue pav = productAttributeValueRepository.findByIdAndProductAttributeId(valueAssignmentId, assignmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Product attribute value assignment not found"));
        pav.setSortOrder(request.getSortOrder());
        pav = productAttributeValueRepository.saveAndFlush(pav);
        return toValueResponse(pav);
    }

    public void deleteValueAssignment(Long productId, Long assignmentId, Long valueAssignmentId) {
        productService.getActiveProductOrThrow(productId);
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
