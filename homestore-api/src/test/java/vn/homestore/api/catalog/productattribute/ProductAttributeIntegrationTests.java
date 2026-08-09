package vn.homestore.api.catalog.productattribute;

import tools.jackson.databind.ObjectMapper;
import tools.jackson.databind.json.JsonMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;
import vn.homestore.api.catalog.attribute.domain.Attribute;
import vn.homestore.api.catalog.attribute.domain.AttributeValue;
import vn.homestore.api.catalog.attribute.infrastructure.AttributeRepository;
import vn.homestore.api.catalog.attribute.infrastructure.AttributeValueRepository;
import vn.homestore.api.catalog.category.domain.Category;
import vn.homestore.api.catalog.category.infrastructure.CategoryRepository;
import vn.homestore.api.catalog.product.domain.Product;
import vn.homestore.api.catalog.product.domain.ProductStatus;
import vn.homestore.api.catalog.product.infrastructure.ProductRepository;
import vn.homestore.api.catalog.productattribute.api.CreateProductAttributeRequest;
import vn.homestore.api.catalog.productattribute.api.CreateProductAttributeValueRequest;
import vn.homestore.api.catalog.productattribute.api.UpdateProductAttributeRequest;
import vn.homestore.api.catalog.productattribute.api.UpdateProductAttributeValueRequest;
import vn.homestore.api.catalog.productattribute.domain.ProductAttribute;
import vn.homestore.api.catalog.productattribute.domain.ProductAttributeValue;
import vn.homestore.api.catalog.productattribute.infrastructure.ProductAttributeRepository;
import vn.homestore.api.catalog.productattribute.infrastructure.ProductAttributeValueRepository;

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@Transactional
class ProductAttributeIntegrationTests {

    private MockMvc mockMvc;
    
    @Autowired
    private WebApplicationContext context;

    private ObjectMapper objectMapper = JsonMapper.builder().build();

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private AttributeRepository attributeRepository;

    @Autowired
    private AttributeValueRepository attributeValueRepository;

    @Autowired
    private ProductAttributeRepository productAttributeRepository;

    @Autowired
    private ProductAttributeValueRepository productAttributeValueRepository;

    private Long activeProductId;
    private Long archivedProductId;
    private Long attribute1Id;
    private Long attribute2Id;
    private Long attr1Value1Id;
    private Long attr1Value2Id;

    @BeforeEach
    void setup() {
        mockMvc = MockMvcBuilders
                .webAppContextSetup(context)
                .apply(springSecurity())
                .build();

        Category category = new Category("Electronics", "electronics");
        categoryRepository.saveAndFlush(category);

        Product activeProduct = new Product(category.getId(), null, "Active Product", "active-product", null, null, ProductStatus.DRAFT, null, null);
        productRepository.saveAndFlush(activeProduct);
        activeProductId = activeProduct.getId();

        Product archivedProduct = new Product(category.getId(), null, "Archived Product", "archived-product", null, null, ProductStatus.DRAFT, null, null);
        archivedProduct.archive();
        productRepository.saveAndFlush(archivedProduct);
        archivedProductId = archivedProduct.getId();

        Attribute attr1 = new Attribute("Color", "color", null, 0, true);
        attributeRepository.saveAndFlush(attr1);
        attribute1Id = attr1.getId();

        Attribute attr2 = new Attribute("Size", "size", null, 1, true);
        attributeRepository.saveAndFlush(attr2);
        attribute2Id = attr2.getId();

        AttributeValue val1 = new AttributeValue(attribute1Id, "Red", "red", 0, true);
        attributeValueRepository.saveAndFlush(val1);
        attr1Value1Id = val1.getId();

        AttributeValue val2 = new AttributeValue(attribute1Id, "Blue", "blue", 1, true);
        attributeValueRepository.saveAndFlush(val2);
        attr1Value2Id = val2.getId();
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void assignAttribute_success() throws Exception {
        CreateProductAttributeRequest req = new CreateProductAttributeRequest();
        req.setAttributeId(attribute1Id);
        req.setSortOrder(10);

        mockMvc.perform(post("/api/v1/admin/products/{productId}/attributes", activeProductId).with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.productId").value(activeProductId))
                .andExpect(jsonPath("$.attributeId").value(attribute1Id))
                .andExpect(jsonPath("$.sortOrder").value(10));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void assignAttribute_duplicate_returns409() throws Exception {
        ProductAttribute pa = new ProductAttribute(activeProductId, attribute1Id, 0);
        productAttributeRepository.saveAndFlush(pa);

        CreateProductAttributeRequest req = new CreateProductAttributeRequest();
        req.setAttributeId(attribute1Id);

        mockMvc.perform(post("/api/v1/admin/products/{productId}/attributes", activeProductId).with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isConflict());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void updateAttributeAssignment_success() throws Exception {
        ProductAttribute pa = new ProductAttribute(activeProductId, attribute1Id, 0);
        pa = productAttributeRepository.saveAndFlush(pa);

        UpdateProductAttributeRequest req = new UpdateProductAttributeRequest();
        req.setSortOrder(99);

        mockMvc.perform(put("/api/v1/admin/products/{productId}/attributes/{id}", activeProductId, pa.getId()).with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.sortOrder").value(99));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void assignValue_success() throws Exception {
        ProductAttribute pa = new ProductAttribute(activeProductId, attribute1Id, 0);
        pa = productAttributeRepository.saveAndFlush(pa);

        CreateProductAttributeValueRequest req = new CreateProductAttributeValueRequest();
        req.setAttributeValueId(attr1Value1Id);
        req.setSortOrder(5);

        mockMvc.perform(post("/api/v1/admin/products/{productId}/attributes/{id}/values", activeProductId, pa.getId()).with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.attributeValueId").value(attr1Value1Id))
                .andExpect(jsonPath("$.sortOrder").value(5));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void assignValue_wrongAttribute_returns400() throws Exception {
        ProductAttribute pa = new ProductAttribute(activeProductId, attribute2Id, 0);
        pa = productAttributeRepository.saveAndFlush(pa);

        CreateProductAttributeValueRequest req = new CreateProductAttributeValueRequest();
        req.setAttributeValueId(attr1Value1Id);

        mockMvc.perform(post("/api/v1/admin/products/{productId}/attributes/{id}/values", activeProductId, pa.getId()).with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void deleteAttribute_withValues_returns409() throws Exception {
        ProductAttribute pa = new ProductAttribute(activeProductId, attribute1Id, 0);
        pa = productAttributeRepository.saveAndFlush(pa);

        ProductAttributeValue pav = new ProductAttributeValue(pa.getId(), attr1Value1Id, 0);
        productAttributeValueRepository.saveAndFlush(pav);

        mockMvc.perform(delete("/api/v1/admin/products/{productId}/attributes/{id}", activeProductId, pa.getId()).with(csrf()))
                .andExpect(status().isConflict());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void archivedProduct_operations_return409() throws Exception {
        CreateProductAttributeRequest req = new CreateProductAttributeRequest();
        req.setAttributeId(attribute1Id);

        mockMvc.perform(post("/api/v1/admin/products/{productId}/attributes", archivedProductId).with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isConflict());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void deleteGlobalAttribute_referenced_returns409() throws Exception {
        ProductAttribute pa = new ProductAttribute(activeProductId, attribute1Id, 0);
        productAttributeRepository.saveAndFlush(pa);

        mockMvc.perform(delete("/api/v1/admin/attributes/{id}", attribute1Id).with(csrf()))
                .andExpect(status().isConflict());
    }
}
