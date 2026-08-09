package vn.homestore.api.catalog.attribute;

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
import vn.homestore.api.catalog.attribute.api.CreateAttributeRequest;
import vn.homestore.api.catalog.attribute.api.CreateAttributeValueRequest;
import vn.homestore.api.catalog.attribute.api.UpdateAttributeRequest;
import vn.homestore.api.catalog.attribute.api.UpdateAttributeValueRequest;
import vn.homestore.api.catalog.attribute.domain.Attribute;
import vn.homestore.api.catalog.attribute.domain.AttributeValue;
import vn.homestore.api.catalog.attribute.infrastructure.AttributeRepository;
import vn.homestore.api.catalog.attribute.infrastructure.AttributeValueRepository;
import vn.homestore.api.common.web.RequestCorrelationFilter;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@Transactional
class AttributeIntegrationTests {

    @Autowired
    private WebApplicationContext context;

    private ObjectMapper objectMapper = JsonMapper.builder().findAndAddModules().build();

    @Autowired
    private AttributeRepository attributeRepository;

    @Autowired
    private AttributeValueRepository attributeValueRepository;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders
                .webAppContextSetup(context)
                .addFilters(new RequestCorrelationFilter())
                .apply(springSecurity())
                .build();
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldCreateAttribute() throws Exception {
        CreateAttributeRequest request = new CreateAttributeRequest(" Màu  sắc ", null, "Attribute for color", null, null);

        mockMvc.perform(post("/api/v1/admin/attributes").with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("Màu sắc"))
                .andExpect(jsonPath("$.slug").value("mau-sac"))
                .andExpect(jsonPath("$.sortOrder").value(0))
                .andExpect(jsonPath("$.active").value(true));
                
        List<Attribute> attributes = attributeRepository.findAll();
        assertThat(attributes).hasSize(1);
        assertThat(attributes.get(0).getSlug()).isEqualTo("mau-sac");
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldRejectDuplicateAttributeName() throws Exception {
        attributeRepository.saveAndFlush(new Attribute("Black", "black", null, 0, true));

        CreateAttributeRequest request = new CreateAttributeRequest("BLACK", null, null, null, null);

        mockMvc.perform(post("/api/v1/admin/attributes").with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.detail").value(containsString("already exists")));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldRejectDuplicateAttributeSlug() throws Exception {
        attributeRepository.saveAndFlush(new Attribute("Color", "test-slug", null, 0, true));

        CreateAttributeRequest request = new CreateAttributeRequest("Another", "test-slug", null, null, null);

        mockMvc.perform(post("/api/v1/admin/attributes").with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.detail").value(containsString("already exists")));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldRejectBlankAttributeName() throws Exception {
        CreateAttributeRequest request = new CreateAttributeRequest("   ", null, null, null, null);

        mockMvc.perform(post("/api/v1/admin/attributes").with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.detail").value(containsString("Request validation failed")));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldRejectNegativeSortOrder() throws Exception {
        CreateAttributeRequest request = new CreateAttributeRequest("Name", null, null, -1, null);

        mockMvc.perform(post("/api/v1/admin/attributes").with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.detail").value(containsString("Request validation failed")));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldUpdateAttribute() throws Exception {
        Attribute attr = attributeRepository.saveAndFlush(new Attribute("Old Name", "old", "desc", 0, true));

        UpdateAttributeRequest request = new UpdateAttributeRequest("New Name", "new", null, 5, false);

        mockMvc.perform(put("/api/v1/admin/attributes/{id}", attr.getId()).with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("New Name"))
                .andExpect(jsonPath("$.slug").value("new"))
                .andExpect(jsonPath("$.description").doesNotExist())
                .andExpect(jsonPath("$.sortOrder").value(5))
                .andExpect(jsonPath("$.active").value(false));
    }
    
    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldRejectUpdateWithMissingSortOrder() throws Exception {
        Attribute attr = attributeRepository.saveAndFlush(new Attribute("Old Name", "old", "desc", 0, true));

        String invalidJson = """
            {
              "name": "New Name",
              "active": true
            }
            """;

        mockMvc.perform(put("/api/v1/admin/attributes/{id}", attr.getId()).with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(invalidJson))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.detail").value(containsString("Request validation failed")));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldRejectUpdateWithMissingActive() throws Exception {
        Attribute attr = attributeRepository.saveAndFlush(new Attribute("Old Name", "old", "desc", 0, true));

        String invalidJson = """
            {
              "name": "New Name",
              "sortOrder": 5
            }
            """;

        mockMvc.perform(put("/api/v1/admin/attributes/{id}", attr.getId()).with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(invalidJson))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.detail").value(containsString("Request validation failed")));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldCreateAttributeValue() throws Exception {
        Attribute attr = attributeRepository.saveAndFlush(new Attribute("Size", "size", null, 0, true));

        CreateAttributeValueRequest request = new CreateAttributeValueRequest(" 1.8   L ", null, null, null);

        mockMvc.perform(post("/api/v1/admin/attributes/{id}/values", attr.getId()).with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.value").value("1.8 L"))
                .andExpect(jsonPath("$.slug").value("1-8-l"))
                .andExpect(jsonPath("$.sortOrder").value(0))
                .andExpect(jsonPath("$.active").value(true));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldRejectCreateAttributeValueMissingParent() throws Exception {
        CreateAttributeValueRequest request = new CreateAttributeValueRequest("Value", null, null, null);

        mockMvc.perform(post("/api/v1/admin/attributes/{id}/values", 9999L).with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldRejectDuplicateAttributeValueSameAttribute() throws Exception {
        Attribute attr = attributeRepository.saveAndFlush(new Attribute("Color", "color", null, 0, true));
        attributeValueRepository.saveAndFlush(new AttributeValue(attr.getId(), "Black", "black", 0, true));

        CreateAttributeValueRequest request = new CreateAttributeValueRequest("BLACK", null, null, null);

        mockMvc.perform(post("/api/v1/admin/attributes/{id}/values", attr.getId()).with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.detail").value(containsString("already exists")));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldRejectDuplicateAttributeValueSlugSameAttribute() throws Exception {
        Attribute attr = attributeRepository.saveAndFlush(new Attribute("Color", "color", null, 0, true));
        attributeValueRepository.saveAndFlush(new AttributeValue(attr.getId(), "Black", "slug", 0, true));

        CreateAttributeValueRequest request = new CreateAttributeValueRequest("Another", "slug", null, null);

        mockMvc.perform(post("/api/v1/admin/attributes/{id}/values", attr.getId()).with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.detail").value(containsString("already exists")));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldAllowSameValueDifferentAttributes() throws Exception {
        Attribute attr1 = attributeRepository.saveAndFlush(new Attribute("Color", "color", null, 0, true));
        Attribute attr2 = attributeRepository.saveAndFlush(new Attribute("Finish", "finish", null, 0, true));
        
        attributeValueRepository.saveAndFlush(new AttributeValue(attr1.getId(), "Black", "black", 0, true));

        CreateAttributeValueRequest request = new CreateAttributeValueRequest("BLACK", "black", null, null);

        mockMvc.perform(post("/api/v1/admin/attributes/{id}/values", attr2.getId()).with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.value").value("BLACK"))
                .andExpect(jsonPath("$.slug").value("black"));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldUpdateAttributeValue() throws Exception {
        Attribute attr = attributeRepository.saveAndFlush(new Attribute("Color", "color", null, 0, true));
        AttributeValue val = attributeValueRepository.saveAndFlush(new AttributeValue(attr.getId(), "Old", "old", 0, true));

        UpdateAttributeValueRequest request = new UpdateAttributeValueRequest("New", "new", 10, false);

        mockMvc.perform(put("/api/v1/admin/attributes/{id}/values/{vid}", attr.getId(), val.getId()).with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.value").value("New"))
                .andExpect(jsonPath("$.slug").value("new"))
                .andExpect(jsonPath("$.sortOrder").value(10))
                .andExpect(jsonPath("$.active").value(false));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldRejectUpdateValueWrongAttributePath() throws Exception {
        Attribute attr1 = attributeRepository.saveAndFlush(new Attribute("A", "a", null, 0, true));
        Attribute attr2 = attributeRepository.saveAndFlush(new Attribute("B", "b", null, 0, true));
        AttributeValue val = attributeValueRepository.saveAndFlush(new AttributeValue(attr1.getId(), "Old", "old", 0, true));

        UpdateAttributeValueRequest request = new UpdateAttributeValueRequest("New", "new", 10, false);

        mockMvc.perform(put("/api/v1/admin/attributes/{id}/values/{vid}", attr2.getId(), val.getId()).with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldRejectUpdateValueWithMissingSortOrder() throws Exception {
        Attribute attr = attributeRepository.saveAndFlush(new Attribute("Color", "color", null, 0, true));
        AttributeValue val = attributeValueRepository.saveAndFlush(new AttributeValue(attr.getId(), "Old", "old", 0, true));

        String invalidJson = """
            {
              "value": "New",
              "active": true
            }
            """;

        mockMvc.perform(put("/api/v1/admin/attributes/{id}/values/{vid}", attr.getId(), val.getId()).with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(invalidJson))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.detail").value(containsString("Request validation failed")));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldRejectUpdateValueWithMissingActive() throws Exception {
        Attribute attr = attributeRepository.saveAndFlush(new Attribute("Color", "color", null, 0, true));
        AttributeValue val = attributeValueRepository.saveAndFlush(new AttributeValue(attr.getId(), "Old", "old", 0, true));

        String invalidJson = """
            {
              "value": "New",
              "sortOrder": 5
            }
            """;

        mockMvc.perform(put("/api/v1/admin/attributes/{id}/values/{vid}", attr.getId(), val.getId()).with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(invalidJson))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.detail").value(containsString("Request validation failed")));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldDeleteAttributeValue() throws Exception {
        Attribute attr = attributeRepository.saveAndFlush(new Attribute("Color", "color", null, 0, true));
        AttributeValue val = attributeValueRepository.saveAndFlush(new AttributeValue(attr.getId(), "Old", "old", 0, true));

        mockMvc.perform(delete("/api/v1/admin/attributes/{id}/values/{vid}", attr.getId(), val.getId()).with(csrf()))
                .andExpect(status().isNoContent());

        assertThat(attributeValueRepository.findById(val.getId())).isEmpty();
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldRejectDeleteAttributeMissing() throws Exception {
        mockMvc.perform(delete("/api/v1/admin/attributes/{id}", 9999L).with(csrf()))
                .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldRejectDeleteAttributeValueMissing() throws Exception {
        Attribute attr = attributeRepository.saveAndFlush(new Attribute("Color", "color", null, 0, true));

        mockMvc.perform(delete("/api/v1/admin/attributes/{id}/values/{vid}", attr.getId(), 9999L).with(csrf()))
                .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldRejectDeleteAttributeWithValues() throws Exception {
        Attribute attr = attributeRepository.saveAndFlush(new Attribute("Color", "color", null, 0, true));
        attributeValueRepository.saveAndFlush(new AttributeValue(attr.getId(), "Old", "old", 0, true));

        mockMvc.perform(delete("/api/v1/admin/attributes/{id}", attr.getId()).with(csrf()))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.detail").value(containsString("cannot be deleted while it has values")));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldDeleteEmptyAttribute() throws Exception {
        Attribute attr = attributeRepository.saveAndFlush(new Attribute("Color", "color", null, 0, true));

        mockMvc.perform(delete("/api/v1/admin/attributes/{id}", attr.getId()).with(csrf()))
                .andExpect(status().isNoContent());

        assertThat(attributeRepository.findById(attr.getId())).isEmpty();
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldEnforceDeterministicAttributeOrdering() throws Exception {
        attributeRepository.saveAndFlush(new Attribute("C", "c", null, 2, true));
        attributeRepository.saveAndFlush(new Attribute("B", "b", null, 1, true));
        attributeRepository.saveAndFlush(new Attribute("A", "a", null, 1, true));

        mockMvc.perform(get("/api/v1/admin/attributes"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(3))
                .andExpect(jsonPath("$[0].name").value("A"))
                .andExpect(jsonPath("$[1].name").value("B"))
                .andExpect(jsonPath("$[2].name").value("C"));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldEnforceDeterministicValueOrdering() throws Exception {
        Attribute attr = attributeRepository.saveAndFlush(new Attribute("Attr", "attr", null, 0, true));
        attributeValueRepository.saveAndFlush(new AttributeValue(attr.getId(), "C", "c", 2, true));
        attributeValueRepository.saveAndFlush(new AttributeValue(attr.getId(), "B", "b", 1, true));
        attributeValueRepository.saveAndFlush(new AttributeValue(attr.getId(), "A", "a", 1, true));

        mockMvc.perform(get("/api/v1/admin/attributes/{id}/values", attr.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(3))
                .andExpect(jsonPath("$[0].value").value("A"))
                .andExpect(jsonPath("$[1].value").value("B"))
                .andExpect(jsonPath("$[2].value").value("C"));
    }
}
