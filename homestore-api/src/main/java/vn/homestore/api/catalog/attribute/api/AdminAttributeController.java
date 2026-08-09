package vn.homestore.api.catalog.attribute.api;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import vn.homestore.api.catalog.attribute.application.AttributeService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/attributes")
public class AdminAttributeController {

    private final AttributeService attributeService;

    public AdminAttributeController(AttributeService attributeService) {
        this.attributeService = attributeService;
    }

    @GetMapping
    public List<AttributeResponse> getAttributes() {
        return attributeService.findAllAttributes().stream()
                .map(AttributeResponse::from)
                .toList();
    }

    @GetMapping("/{id}")
    public AttributeResponse getAttribute(@PathVariable Long id) {
        return AttributeResponse.from(attributeService.getAttributeOrThrow(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AttributeResponse createAttribute(@Valid @RequestBody CreateAttributeRequest request) {
        return AttributeResponse.from(attributeService.createAttribute(request));
    }

    @PutMapping("/{id}")
    public AttributeResponse updateAttribute(@PathVariable Long id, @Valid @RequestBody UpdateAttributeRequest request) {
        return AttributeResponse.from(attributeService.updateAttribute(id, request));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAttribute(@PathVariable Long id) {
        attributeService.deleteAttribute(id);
    }

    @GetMapping("/{id}/values")
    public List<AttributeValueResponse> getAttributeValues(@PathVariable Long id) {
        return attributeService.findValuesByAttributeId(id).stream()
                .map(AttributeValueResponse::from)
                .toList();
    }

    @GetMapping("/{id}/values/{valueId}")
    public AttributeValueResponse getAttributeValue(@PathVariable Long id, @PathVariable Long valueId) {
        return AttributeValueResponse.from(attributeService.getValueOrThrow(id, valueId));
    }

    @PostMapping("/{id}/values")
    @ResponseStatus(HttpStatus.CREATED)
    public AttributeValueResponse createAttributeValue(@PathVariable Long id, @Valid @RequestBody CreateAttributeValueRequest request) {
        return AttributeValueResponse.from(attributeService.createAttributeValue(id, request));
    }

    @PutMapping("/{id}/values/{valueId}")
    public AttributeValueResponse updateAttributeValue(@PathVariable Long id, @PathVariable Long valueId, @Valid @RequestBody UpdateAttributeValueRequest request) {
        return AttributeValueResponse.from(attributeService.updateAttributeValue(id, valueId, request));
    }

    @DeleteMapping("/{id}/values/{valueId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAttributeValue(@PathVariable Long id, @PathVariable Long valueId) {
        attributeService.deleteAttributeValue(id, valueId);
    }
}
