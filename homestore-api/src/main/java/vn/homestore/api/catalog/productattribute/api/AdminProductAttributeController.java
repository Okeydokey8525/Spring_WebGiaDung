package vn.homestore.api.catalog.productattribute.api;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import vn.homestore.api.catalog.productattribute.application.ProductAttributeService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/products/{productId}/attributes")
public class AdminProductAttributeController {

    private final ProductAttributeService productAttributeService;

    public AdminProductAttributeController(ProductAttributeService productAttributeService) {
        this.productAttributeService = productAttributeService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProductAttributeResponse assignAttribute(
            @PathVariable Long productId,
            @Valid @RequestBody CreateProductAttributeRequest request) {
        return productAttributeService.assignAttribute(productId, request);
    }

    @GetMapping
    public List<ProductAttributeResponse> getAttributes(@PathVariable Long productId) {
        return productAttributeService.getAttributesByProduct(productId);
    }

    @GetMapping("/{assignmentId}")
    public ProductAttributeResponse getAttributeAssignment(
            @PathVariable Long productId,
            @PathVariable Long assignmentId) {
        return productAttributeService.getAttributeAssignment(productId, assignmentId);
    }

    @PutMapping("/{assignmentId}")
    public ProductAttributeResponse updateAttributeAssignment(
            @PathVariable Long productId,
            @PathVariable Long assignmentId,
            @Valid @RequestBody UpdateProductAttributeRequest request) {
        return productAttributeService.updateAttributeAssignment(productId, assignmentId, request);
    }

    @DeleteMapping("/{assignmentId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAttributeAssignment(
            @PathVariable Long productId,
            @PathVariable Long assignmentId) {
        productAttributeService.deleteAttributeAssignment(productId, assignmentId);
    }

    @PostMapping("/{assignmentId}/values")
    @ResponseStatus(HttpStatus.CREATED)
    public ProductAttributeValueResponse assignValue(
            @PathVariable Long productId,
            @PathVariable Long assignmentId,
            @Valid @RequestBody CreateProductAttributeValueRequest request) {
        return productAttributeService.assignValue(productId, assignmentId, request);
    }

    @GetMapping("/{assignmentId}/values")
    public List<ProductAttributeValueResponse> getValues(
            @PathVariable Long productId,
            @PathVariable Long assignmentId) {
        return productAttributeService.getValuesByAssignment(productId, assignmentId);
    }

    @GetMapping("/{assignmentId}/values/{valueAssignmentId}")
    public ProductAttributeValueResponse getValueAssignment(
            @PathVariable Long productId,
            @PathVariable Long assignmentId,
            @PathVariable Long valueAssignmentId) {
        return productAttributeService.getValueAssignment(productId, assignmentId, valueAssignmentId);
    }

    @PutMapping("/{assignmentId}/values/{valueAssignmentId}")
    public ProductAttributeValueResponse updateValueAssignment(
            @PathVariable Long productId,
            @PathVariable Long assignmentId,
            @PathVariable Long valueAssignmentId,
            @Valid @RequestBody UpdateProductAttributeValueRequest request) {
        return productAttributeService.updateValueAssignment(productId, assignmentId, valueAssignmentId, request);
    }

    @DeleteMapping("/{assignmentId}/values/{valueAssignmentId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteValueAssignment(
            @PathVariable Long productId,
            @PathVariable Long assignmentId,
            @PathVariable Long valueAssignmentId) {
        productAttributeService.deleteValueAssignment(productId, assignmentId, valueAssignmentId);
    }
}
