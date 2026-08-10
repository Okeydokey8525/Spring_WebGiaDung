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
import org.springframework.test.web.servlet.MvcResult;
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
import vn.homestore.api.common.web.RequestCorrelationFilter;

import java.lang.reflect.Field;
import java.util.Arrays;

import static org.assertj.core.api.Assertions.assertThat;
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

    @Autowired private ProductRepository productRepository;
    @Autowired private CategoryRepository categoryRepository;
    @Autowired private AttributeRepository attributeRepository;
    @Autowired private AttributeValueRepository attributeValueRepository;
    @Autowired private ProductAttributeRepository productAttributeRepository;
    @Autowired private ProductAttributeValueRepository productAttributeValueRepository;
    @Autowired private RequestCorrelationFilter correlationFilter;

    private Long activeProductId;
    private Long archivedProductId;
    private Long attribute1Id;
    private Long attribute2Id;
    private Long attr1Value1Id;
    private Long attr1Value2Id;
    private Long attr2Value1Id;
    
    private Long paArchivedId;
    private Long pavArchivedId;

    @BeforeEach
    void setup() {
        mockMvc = MockMvcBuilders.webAppContextSetup(context)
                .addFilters(correlationFilter)
                .apply(springSecurity())
                .build();

        Category category = new Category("Electronics", "electronics");
        categoryRepository.saveAndFlush(category);

        Product activeProduct = new Product(category.getId(), null, "Active Product", "active-product", null, null, ProductStatus.DRAFT, null, null);
        productRepository.saveAndFlush(activeProduct);
        activeProductId = activeProduct.getId();

        Product archivedProduct = new Product(category.getId(), null, "Archived Product", "archived-product", null, null, ProductStatus.DRAFT, null, null);
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
        
        AttributeValue val3 = new AttributeValue(attribute2Id, "Large", "large", 0, true);
        attributeValueRepository.saveAndFlush(val3);
        attr2Value1Id = val3.getId();
        
        ProductAttribute paArchived = new ProductAttribute(archivedProductId, attribute1Id, 0);
        productAttributeRepository.saveAndFlush(paArchived);
        paArchivedId = paArchived.getId();
        
        ProductAttributeValue pavArchived = new ProductAttributeValue(paArchivedId, attr1Value1Id, 0);
        productAttributeValueRepository.saveAndFlush(pavArchived);
        pavArchivedId = pavArchived.getId();
        
        archivedProduct.archive();
        productRepository.saveAndFlush(archivedProduct);
    }

    // --- STEP 4: REQUIRED ATTRIBUTE ASSIGNMENT TESTS ---

    @Test
    @WithMockUser(roles = "ADMIN")
    void test01_assignAttribute_success_returns201() throws Exception {
        CreateProductAttributeRequest req = new CreateProductAttributeRequest();
        req.setAttributeId(attribute1Id);
        mockMvc.perform(post("/api/v1/admin/products/{pId}/attributes", activeProductId).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isCreated());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void test02_assignAttribute_missingProduct_returns404() throws Exception {
        CreateProductAttributeRequest req = new CreateProductAttributeRequest();
        req.setAttributeId(attribute1Id);
        mockMvc.perform(post("/api/v1/admin/products/{pId}/attributes", 999999L).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void test03_assignAttribute_missingAttribute_returns404() throws Exception {
        CreateProductAttributeRequest req = new CreateProductAttributeRequest();
        req.setAttributeId(999999L);
        mockMvc.perform(post("/api/v1/admin/products/{pId}/attributes", activeProductId).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void test04_assignAttribute_duplicate_returns409() throws Exception {
        productAttributeRepository.saveAndFlush(new ProductAttribute(activeProductId, attribute1Id, 0));
        CreateProductAttributeRequest req = new CreateProductAttributeRequest();
        req.setAttributeId(attribute1Id);
        mockMvc.perform(post("/api/v1/admin/products/{pId}/attributes", activeProductId).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isConflict());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void test05_assignAttribute_sameAttributeDifferentProduct_allowed() throws Exception {
        productAttributeRepository.saveAndFlush(new ProductAttribute(activeProductId, attribute1Id, 0));
        
        Product p2 = new Product(categoryRepository.findAll().get(0).getId(), null, "P2", "p2", null, null, ProductStatus.DRAFT, null, null);
        productRepository.saveAndFlush(p2);
        
        CreateProductAttributeRequest req = new CreateProductAttributeRequest();
        req.setAttributeId(attribute1Id);
        mockMvc.perform(post("/api/v1/admin/products/{pId}/attributes", p2.getId()).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isCreated());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void test06_getAttributes_deterministicOrdering() throws Exception {
        productAttributeRepository.saveAndFlush(new ProductAttribute(activeProductId, attribute2Id, 10));
        productAttributeRepository.saveAndFlush(new ProductAttribute(activeProductId, attribute1Id, 5));
        
        mockMvc.perform(get("/api/v1/admin/products/{pId}/attributes", activeProductId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.[0].attributeId").value(attribute1Id))
                .andExpect(jsonPath("$.[1].attributeId").value(attribute2Id));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void test07_updateAttributeAssignment_success_returns200() throws Exception {
        ProductAttribute pa = productAttributeRepository.saveAndFlush(new ProductAttribute(activeProductId, attribute1Id, 0));
        UpdateProductAttributeRequest req = new UpdateProductAttributeRequest();
        req.setSortOrder(99);
        mockMvc.perform(put("/api/v1/admin/products/{pId}/attributes/{id}", activeProductId, pa.getId()).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void test08_updateAttributeAssignment_persistsSortOrder() throws Exception {
        ProductAttribute pa = productAttributeRepository.saveAndFlush(new ProductAttribute(activeProductId, attribute1Id, 0));
        UpdateProductAttributeRequest req = new UpdateProductAttributeRequest();
        req.setSortOrder(99);
        mockMvc.perform(put("/api/v1/admin/products/{pId}/attributes/{id}", activeProductId, pa.getId()).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(req)));
        
        ProductAttribute updated = productAttributeRepository.findById(pa.getId()).orElseThrow();
        assertThat(updated.getSortOrder()).isEqualTo(99);
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void test09_updateAttributeAssignment_refreshesUpdatedAt() throws Exception {
        ProductAttribute pa = productAttributeRepository.saveAndFlush(new ProductAttribute(activeProductId, attribute1Id, 0));
        var oldDate = pa.getUpdatedAt();
        
        UpdateProductAttributeRequest req = new UpdateProductAttributeRequest();
        req.setSortOrder(99);
        mockMvc.perform(put("/api/v1/admin/products/{pId}/attributes/{id}", activeProductId, pa.getId()).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(req)));
        
        ProductAttribute updated = productAttributeRepository.findById(pa.getId()).orElseThrow();
        assertThat(updated.getUpdatedAt()).isAfterOrEqualTo(oldDate);
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void test10_updateAttributeAssignment_wrongProductPath_returns404() throws Exception {
        ProductAttribute pa = productAttributeRepository.saveAndFlush(new ProductAttribute(activeProductId, attribute1Id, 0));
        UpdateProductAttributeRequest req = new UpdateProductAttributeRequest();
        req.setSortOrder(99);
        mockMvc.perform(put("/api/v1/admin/products/{pId}/attributes/{id}", 999999L, pa.getId()).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isNotFound());
    }

    @Test
    void test11_updateProductAttributeRequest_exposesNoAttributeId() {
        boolean hasAttributeId = Arrays.stream(UpdateProductAttributeRequest.class.getDeclaredFields())
                .anyMatch(f -> f.getName().equals("attributeId"));
        assertThat(hasAttributeId).isFalse();
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void test12_deleteAttributeAssignment_empty_returns204() throws Exception {
        ProductAttribute pa = productAttributeRepository.saveAndFlush(new ProductAttribute(activeProductId, attribute1Id, 0));
        mockMvc.perform(delete("/api/v1/admin/products/{pId}/attributes/{id}", activeProductId, pa.getId()).with(csrf()))
                .andExpect(status().isNoContent());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void test13_deleteAttributeAssignment_withValues_returns409() throws Exception {
        ProductAttribute pa = productAttributeRepository.saveAndFlush(new ProductAttribute(activeProductId, attribute1Id, 0));
        productAttributeValueRepository.saveAndFlush(new ProductAttributeValue(pa.getId(), attr1Value1Id, 0));
        mockMvc.perform(delete("/api/v1/admin/products/{pId}/attributes/{id}", activeProductId, pa.getId()).with(csrf()))
                .andExpect(status().isConflict());
    }

    // --- STEP 5: REQUIRED VALUE ASSIGNMENT TESTS ---

    @Test
    @WithMockUser(roles = "ADMIN")
    void test14_assignValue_success_returns201() throws Exception {
        ProductAttribute pa = productAttributeRepository.saveAndFlush(new ProductAttribute(activeProductId, attribute1Id, 0));
        CreateProductAttributeValueRequest req = new CreateProductAttributeValueRequest();
        req.setAttributeValueId(attr1Value1Id);
        mockMvc.perform(post("/api/v1/admin/products/{pId}/attributes/{id}/values", activeProductId, pa.getId()).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isCreated());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void test15_assignValue_missingValue_returns404() throws Exception {
        ProductAttribute pa = productAttributeRepository.saveAndFlush(new ProductAttribute(activeProductId, attribute1Id, 0));
        CreateProductAttributeValueRequest req = new CreateProductAttributeValueRequest();
        req.setAttributeValueId(999999L);
        mockMvc.perform(post("/api/v1/admin/products/{pId}/attributes/{id}/values", activeProductId, pa.getId()).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void test16_assignValue_wrongAttribute_returns400() throws Exception {
        ProductAttribute pa = productAttributeRepository.saveAndFlush(new ProductAttribute(activeProductId, attribute2Id, 0));
        CreateProductAttributeValueRequest req = new CreateProductAttributeValueRequest();
        req.setAttributeValueId(attr1Value1Id);
        mockMvc.perform(post("/api/v1/admin/products/{pId}/attributes/{id}/values", activeProductId, pa.getId()).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void test17_assignValue_duplicate_returns409() throws Exception {
        ProductAttribute pa = productAttributeRepository.saveAndFlush(new ProductAttribute(activeProductId, attribute1Id, 0));
        productAttributeValueRepository.saveAndFlush(new ProductAttributeValue(pa.getId(), attr1Value1Id, 0));
        CreateProductAttributeValueRequest req = new CreateProductAttributeValueRequest();
        req.setAttributeValueId(attr1Value1Id);
        mockMvc.perform(post("/api/v1/admin/products/{pId}/attributes/{id}/values", activeProductId, pa.getId()).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isConflict());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void test18_assignValue_sameValueEquivalentAssignmentAnotherProduct_allowed() throws Exception {
        ProductAttribute pa1 = productAttributeRepository.saveAndFlush(new ProductAttribute(activeProductId, attribute1Id, 0));
        productAttributeValueRepository.saveAndFlush(new ProductAttributeValue(pa1.getId(), attr1Value1Id, 0));
        
        Product p2 = new Product(categoryRepository.findAll().get(0).getId(), null, "P2", "p2", null, null, ProductStatus.DRAFT, null, null);
        productRepository.saveAndFlush(p2);
        ProductAttribute pa2 = productAttributeRepository.saveAndFlush(new ProductAttribute(p2.getId(), attribute1Id, 0));
        
        CreateProductAttributeValueRequest req = new CreateProductAttributeValueRequest();
        req.setAttributeValueId(attr1Value1Id);
        mockMvc.perform(post("/api/v1/admin/products/{pId}/attributes/{id}/values", p2.getId(), pa2.getId()).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isCreated());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void test19_getValues_deterministicOrdering() throws Exception {
        ProductAttribute pa = productAttributeRepository.saveAndFlush(new ProductAttribute(activeProductId, attribute1Id, 0));
        productAttributeValueRepository.saveAndFlush(new ProductAttributeValue(pa.getId(), attr1Value2Id, 10));
        productAttributeValueRepository.saveAndFlush(new ProductAttributeValue(pa.getId(), attr1Value1Id, 5));
        
        mockMvc.perform(get("/api/v1/admin/products/{pId}/attributes/{id}/values", activeProductId, pa.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.[0].attributeValueId").value(attr1Value1Id))
                .andExpect(jsonPath("$.[1].attributeValueId").value(attr1Value2Id));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void test20_assignValue_wrongProductPath_returns404() throws Exception {
        ProductAttribute pa = productAttributeRepository.saveAndFlush(new ProductAttribute(activeProductId, attribute1Id, 0));
        CreateProductAttributeValueRequest req = new CreateProductAttributeValueRequest();
        req.setAttributeValueId(attr1Value1Id);
        mockMvc.perform(post("/api/v1/admin/products/{pId}/attributes/{id}/values", 999999L, pa.getId()).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void test21_assignValue_wrongProductAttributePath_returns404() throws Exception {
        CreateProductAttributeValueRequest req = new CreateProductAttributeValueRequest();
        req.setAttributeValueId(attr1Value1Id);
        mockMvc.perform(post("/api/v1/admin/products/{pId}/attributes/{id}/values", activeProductId, 999999L).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void test22_getValue_wrongProductAttributeValuePath_returns404() throws Exception {
        ProductAttribute pa = productAttributeRepository.saveAndFlush(new ProductAttribute(activeProductId, attribute1Id, 0));
        mockMvc.perform(get("/api/v1/admin/products/{pId}/attributes/{id}/values/{vid}", activeProductId, pa.getId(), 999999L))
                .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void test23_updateValueAssignment_success_returns200() throws Exception {
        ProductAttribute pa = productAttributeRepository.saveAndFlush(new ProductAttribute(activeProductId, attribute1Id, 0));
        ProductAttributeValue pav = productAttributeValueRepository.saveAndFlush(new ProductAttributeValue(pa.getId(), attr1Value1Id, 0));
        UpdateProductAttributeValueRequest req = new UpdateProductAttributeValueRequest();
        req.setSortOrder(99);
        mockMvc.perform(put("/api/v1/admin/products/{pId}/attributes/{id}/values/{vId}", activeProductId, pa.getId(), pav.getId()).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void test24_updateValueAssignment_persistsSortOrder() throws Exception {
        ProductAttribute pa = productAttributeRepository.saveAndFlush(new ProductAttribute(activeProductId, attribute1Id, 0));
        ProductAttributeValue pav = productAttributeValueRepository.saveAndFlush(new ProductAttributeValue(pa.getId(), attr1Value1Id, 0));
        UpdateProductAttributeValueRequest req = new UpdateProductAttributeValueRequest();
        req.setSortOrder(99);
        mockMvc.perform(put("/api/v1/admin/products/{pId}/attributes/{id}/values/{vId}", activeProductId, pa.getId(), pav.getId()).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(req)));
        
        ProductAttributeValue updated = productAttributeValueRepository.findById(pav.getId()).orElseThrow();
        assertThat(updated.getSortOrder()).isEqualTo(99);
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void test25_updateValueAssignment_refreshesUpdatedAt() throws Exception {
        ProductAttribute pa = productAttributeRepository.saveAndFlush(new ProductAttribute(activeProductId, attribute1Id, 0));
        ProductAttributeValue pav = productAttributeValueRepository.saveAndFlush(new ProductAttributeValue(pa.getId(), attr1Value1Id, 0));
        var oldDate = pav.getUpdatedAt();
        
        UpdateProductAttributeValueRequest req = new UpdateProductAttributeValueRequest();
        req.setSortOrder(99);
        mockMvc.perform(put("/api/v1/admin/products/{pId}/attributes/{id}/values/{vId}", activeProductId, pa.getId(), pav.getId()).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(req)));
        
        ProductAttributeValue updated = productAttributeValueRepository.findById(pav.getId()).orElseThrow();
        assertThat(updated.getUpdatedAt()).isAfterOrEqualTo(oldDate);
    }

    @Test
    void test26_updateProductAttributeValueRequest_exposesNoAttributeValueId() {
        boolean hasId = Arrays.stream(UpdateProductAttributeValueRequest.class.getDeclaredFields())
                .anyMatch(f -> f.getName().equals("attributeValueId"));
        assertThat(hasId).isFalse();
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void test27_deleteValueAssignment_success_returns204() throws Exception {
        ProductAttribute pa = productAttributeRepository.saveAndFlush(new ProductAttribute(activeProductId, attribute1Id, 0));
        ProductAttributeValue pav = productAttributeValueRepository.saveAndFlush(new ProductAttributeValue(pa.getId(), attr1Value1Id, 0));
        mockMvc.perform(delete("/api/v1/admin/products/{pId}/attributes/{id}/values/{vId}", activeProductId, pa.getId(), pav.getId()).with(csrf()))
                .andExpect(status().isNoContent());
    }

    // --- STEP 6: ARCHIVED PRODUCT MATRIX ---

    @Test
    @WithMockUser(roles = "ADMIN")
    void test28_getAttributes_archivedProduct_returns200() throws Exception {
        mockMvc.perform(get("/api/v1/admin/products/{pId}/attributes", archivedProductId))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void test29_getAttribute_archivedProduct_returns200() throws Exception {
        mockMvc.perform(get("/api/v1/admin/products/{pId}/attributes/{id}", archivedProductId, paArchivedId))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void test30_getValues_archivedProduct_returns200() throws Exception {
        mockMvc.perform(get("/api/v1/admin/products/{pId}/attributes/{id}/values", archivedProductId, paArchivedId))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void test31_getValue_archivedProduct_returns200() throws Exception {
        mockMvc.perform(get("/api/v1/admin/products/{pId}/attributes/{id}/values/{vid}", archivedProductId, paArchivedId, pavArchivedId))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void test32_assignAttribute_archivedProduct_returns409() throws Exception {
        CreateProductAttributeRequest req = new CreateProductAttributeRequest();
        req.setAttributeId(attribute2Id);
        mockMvc.perform(post("/api/v1/admin/products/{pId}/attributes", archivedProductId).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isConflict());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void test33_updateAttribute_archivedProduct_returns409() throws Exception {
        UpdateProductAttributeRequest req = new UpdateProductAttributeRequest();
        req.setSortOrder(99);
        mockMvc.perform(put("/api/v1/admin/products/{pId}/attributes/{id}", archivedProductId, paArchivedId).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isConflict());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void test34_deleteAttribute_archivedProduct_returns409() throws Exception {
        mockMvc.perform(delete("/api/v1/admin/products/{pId}/attributes/{id}", archivedProductId, paArchivedId).with(csrf()))
                .andExpect(status().isConflict());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void test35_assignValue_archivedProduct_returns409() throws Exception {
        CreateProductAttributeValueRequest req = new CreateProductAttributeValueRequest();
        req.setAttributeValueId(attr1Value2Id);
        mockMvc.perform(post("/api/v1/admin/products/{pId}/attributes/{id}/values", archivedProductId, paArchivedId).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isConflict());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void test36_updateValue_archivedProduct_returns409() throws Exception {
        UpdateProductAttributeValueRequest req = new UpdateProductAttributeValueRequest();
        req.setSortOrder(99);
        mockMvc.perform(put("/api/v1/admin/products/{pId}/attributes/{id}/values/{vId}", archivedProductId, paArchivedId, pavArchivedId).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isConflict());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void test37_deleteValue_archivedProduct_returns409() throws Exception {
        mockMvc.perform(delete("/api/v1/admin/products/{pId}/attributes/{id}/values/{vId}", archivedProductId, paArchivedId, pavArchivedId).with(csrf()))
                .andExpect(status().isConflict());
    }

    // --- STEP 7: GLOBAL ATTRIBUTE DELETE INTEGRATION ---

    @Test
    @WithMockUser(roles = "ADMIN")
    void test38_deleteGlobalAttribute_assignedToActiveProduct_returns409() throws Exception {
        productAttributeRepository.saveAndFlush(new ProductAttribute(activeProductId, attribute2Id, 0));
        mockMvc.perform(delete("/api/v1/admin/attributes/{id}", attribute2Id).with(csrf()))
                .andExpect(status().isConflict());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void test39_deleteGlobalAttribute_assignedToArchivedProduct_returns409() throws Exception {
        mockMvc.perform(delete("/api/v1/admin/attributes/{id}", attribute1Id).with(csrf()))
                .andExpect(status().isConflict());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void test40_deleteGlobalAttributeValue_assignedToActiveProduct_returns409() throws Exception {
        ProductAttribute pa = productAttributeRepository.saveAndFlush(new ProductAttribute(activeProductId, attribute2Id, 0));
        productAttributeValueRepository.saveAndFlush(new ProductAttributeValue(pa.getId(), attr2Value1Id, 0));
        mockMvc.perform(delete("/api/v1/admin/attributes/{aId}/values/{vId}", attribute2Id, attr2Value1Id).with(csrf()))
                .andExpect(status().isConflict());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void test41_deleteGlobalAttributeValue_assignedToArchivedProduct_returns409() throws Exception {
        mockMvc.perform(delete("/api/v1/admin/attributes/{aId}/values/{vId}", attribute1Id, attr1Value1Id).with(csrf()))
                .andExpect(status().isConflict());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void test42_deleteGlobalAttributeValue_unreferenced_returns204() throws Exception {
        mockMvc.perform(delete("/api/v1/admin/attributes/{aId}/values/{vId}", attribute1Id, attr1Value2Id).with(csrf()))
                .andExpect(status().isNoContent());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void test43_deleteGlobalAttribute_unreferenced_returns204() throws Exception {
        Attribute attr3 = attributeRepository.saveAndFlush(new Attribute("Unreferenced", "unreferenced", null, 0, true));
        mockMvc.perform(delete("/api/v1/admin/attributes/{id}", attr3.getId()).with(csrf()))
                .andExpect(status().isNoContent());
    }

    // --- STEP 8: ERROR CONTRACT ---

    @Test
    @WithMockUser(roles = "ADMIN")
    void test44_errorContract_returnsProblemDetailWithRequestId() throws Exception {
        CreateProductAttributeRequest req = new CreateProductAttributeRequest();
        req.setAttributeId(attribute1Id);
        MvcResult result = mockMvc.perform(post("/api/v1/admin/products/{pId}/attributes", archivedProductId).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isConflict())
                .andReturn();
        
        String content = result.getResponse().getContentAsString();
        assertThat(content).contains("\"status\":409");
        assertThat(content).contains("\"detail\"");
        assertThat(content).contains("\"requestId\"");
    }
}
