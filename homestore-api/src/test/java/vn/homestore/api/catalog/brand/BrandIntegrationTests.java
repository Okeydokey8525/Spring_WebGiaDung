package vn.homestore.api.catalog.brand;

import tools.jackson.databind.ObjectMapper;
import tools.jackson.databind.json.JsonMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;
import vn.homestore.api.catalog.brand.api.CreateBrandRequest;
import vn.homestore.api.catalog.brand.api.UpdateBrandRequest;
import vn.homestore.api.catalog.brand.domain.Brand;
import vn.homestore.api.catalog.brand.infrastructure.BrandRepository;
import vn.homestore.api.common.web.RequestCorrelationFilter;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;

@SpringBootTest
@Transactional
@WithMockUser(roles = "ADMIN")
class BrandIntegrationTests {

    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    private ObjectMapper objectMapper = JsonMapper.builder().findAndAddModules().build();

    @Autowired
    private BrandRepository brandRepository;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext)
                .addFilter(new RequestCorrelationFilter())
                .apply(springSecurity())
                .build();
    }

    @Test
    void shouldCreateBrand() throws Exception {
        CreateBrandRequest request = new CreateBrandRequest("Apple", null, "Tech giant", null, "https://apple.com", 1, true, null, null);

        mockMvc.perform(post("/api/v1/admin/brands").with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(header().exists("Location"))
                .andExpect(jsonPath("$.name").value("Apple"))
                .andExpect(jsonPath("$.slug").value("apple"))
                .andExpect(jsonPath("$.websiteUrl").value("https://apple.com"));

        assertThat(brandRepository.existsBySlug("apple")).isTrue();
    }

    @Test
    void shouldNormalizeNameWhitespace() throws Exception {
        CreateBrandRequest request = new CreateBrandRequest("  Samsung   Electronics  ", null, null, null, null, null, null, null, null);

        mockMvc.perform(post("/api/v1/admin/brands").with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("Samsung Electronics"))
                .andExpect(jsonPath("$.slug").value("samsung-electronics"));
    }

    @Test
    void shouldGenerateVietnameseSlug() throws Exception {
        CreateBrandRequest request = new CreateBrandRequest("Điện Quang", null, null, null, null, null, null, null, null);

        mockMvc.perform(post("/api/v1/admin/brands").with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.slug").value("dien-quang"));
    }

    @Test
    void shouldNormalizeSuppliedSlug() throws Exception {
        CreateBrandRequest request = new CreateBrandRequest("Sony", "  SoNy-   ", null, null, null, null, null, null, null);

        mockMvc.perform(post("/api/v1/admin/brands").with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.slug").value("sony"));
    }

    @Test
    void shouldRejectDuplicateName() throws Exception {
        brandRepository.saveAndFlush(new Brand("Dyson", "dyson-1"));

        CreateBrandRequest request = new CreateBrandRequest("Dyson", "dyson-2", null, null, null, null, null, null, null);

        mockMvc.perform(post("/api/v1/admin/brands").with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.detail").value("Duplicate brand name"));
    }

    @Test
    void shouldRejectDuplicateSlug() throws Exception {
        brandRepository.saveAndFlush(new Brand("Dyson 1", "dyson"));

        CreateBrandRequest request = new CreateBrandRequest("Dyson 2", "dyson", null, null, null, null, null, null, null);

        mockMvc.perform(post("/api/v1/admin/brands").with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.detail").value("Duplicate brand slug"));
    }

    @Test
    void shouldRejectBlankName() throws Exception {
        CreateBrandRequest request = new CreateBrandRequest("   ", null, null, null, null, null, null, null, null);

        mockMvc.perform(post("/api/v1/admin/brands").with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void shouldRejectNegativeSortOrder() throws Exception {
        CreateBrandRequest request = new CreateBrandRequest("Test", null, null, null, null, -1, null, null, null);

        mockMvc.perform(post("/api/v1/admin/brands").with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void shouldRejectInvalidWebsiteScheme() throws Exception {
        CreateBrandRequest request = new CreateBrandRequest("Test", null, null, null, "javascript:alert(1)", null, null, null, null);

        mockMvc.perform(post("/api/v1/admin/brands").with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.detail").value("Website URL must use http or https scheme"));
    }

    @Test
    void shouldRejectMalformedWebsite() throws Exception {
        CreateBrandRequest request = new CreateBrandRequest("Test", null, null, null, "https://", null, null, null, null);

        mockMvc.perform(post("/api/v1/admin/brands").with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.detail").value("Invalid website URL format"));
    }
    
    @Test
    void shouldRejectNotAbsoluteWebsite() throws Exception {
        CreateBrandRequest request = new CreateBrandRequest("Test", null, null, null, "example.com", null, null, null, null);

        mockMvc.perform(post("/api/v1/admin/brands").with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.detail").value("Website URL must be absolute"));
    }

    @Test
    void shouldUpdateBrandAndApplyPutSemantics() throws Exception {
        Brand brand = new Brand("Old Name", "old-slug");
        brand.setDescription("Desc");
        brand.setWebsiteUrl("https://old.com");
        brand = brandRepository.saveAndFlush(brand);

        UpdateBrandRequest request = new UpdateBrandRequest("New Name", null, null, null, null, 1, true, null, null);

        mockMvc.perform(put("/api/v1/admin/brands/{id}", brand.getId()).with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("New Name"))
                .andExpect(jsonPath("$.slug").value("new-name"))
                .andExpect(jsonPath("$.description").doesNotExist()) // cleared
                .andExpect(jsonPath("$.websiteUrl").doesNotExist());
    }

    @Test
    void shouldRejectUpdateDuplicateName() throws Exception {
        brandRepository.saveAndFlush(new Brand("Brand A", "brand-a"));
        Brand brandB = brandRepository.saveAndFlush(new Brand("Brand B", "brand-b"));

        UpdateBrandRequest request = new UpdateBrandRequest("Brand A", null, null, null, null, 0, true, null, null);

        mockMvc.perform(put("/api/v1/admin/brands/{id}", brandB.getId()).with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.detail").value("Duplicate brand name"));
    }

    @Test
    void shouldRejectUpdateDuplicateSlug() throws Exception {
        brandRepository.saveAndFlush(new Brand("Brand A", "brand-a"));
        Brand brandB = brandRepository.saveAndFlush(new Brand("Brand B", "brand-b"));

        UpdateBrandRequest request = new UpdateBrandRequest("Brand B Changed", "brand-a", null, null, null, 0, true, null, null);

        mockMvc.perform(put("/api/v1/admin/brands/{id}", brandB.getId()).with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.detail").value("Duplicate brand slug"));
    }

    @Test
    @WithAnonymousUser
    void shouldEnforcePublicListOrderingAndExcludeInactive() throws Exception {
        Brand b1 = new Brand("Brand Z", "brand-z"); b1.setSortOrder(2);
        Brand b2 = new Brand("Brand A", "brand-a"); b2.setSortOrder(1);
        Brand b3 = new Brand("Brand B", "brand-b"); b3.setSortOrder(1);
        Brand b4 = new Brand("Brand Inactive", "brand-inactive"); b4.setActive(false);
        
        brandRepository.saveAllAndFlush(List.of(b1, b2, b3, b4));

        // Ordering should be: sortOrder ASC, name ASC => b2 (1, A), b3 (1, B), b1 (2, Z)
        mockMvc.perform(get("/api/v1/brands"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)))
                .andExpect(jsonPath("$[0].name").value("Brand A"))
                .andExpect(jsonPath("$[1].name").value("Brand B"))
                .andExpect(jsonPath("$[2].name").value("Brand Z"));
    }

    @Test
    @WithAnonymousUser
    void shouldReturn404ForInactivePublicBrand() throws Exception {
        Brand brand = new Brand("Inactive", "inactive");
        brand.setActive(false);
        brandRepository.saveAndFlush(brand);

        mockMvc.perform(get("/api/v1/brands/inactive"))
                .andExpect(status().isNotFound());
    }
    
    @Test
    void shouldIncludeInactiveInAdminList() throws Exception {
        Brand brand = new Brand("Inactive", "inactive");
        brand.setActive(false);
        brandRepository.saveAndFlush(brand);

        mockMvc.perform(get("/api/v1/admin/brands"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].name").value("Inactive"));
    }

    @Test
    void shouldDeleteBrand() throws Exception {
        Brand brand = brandRepository.saveAndFlush(new Brand("Delete Me", "delete-me"));

        mockMvc.perform(delete("/api/v1/admin/brands/{id}", brand.getId()).with(csrf()))
                .andExpect(status().isNoContent());

        assertThat(brandRepository.existsById(brand.getId())).isFalse();
    }

    @Test
    void shouldReturn404ForMissingBrand() throws Exception {
        mockMvc.perform(delete("/api/v1/admin/brands/9999").with(csrf()))
                .andExpect(status().isNotFound());
    }
    
    @Test
    void problemDetailIncludesRequestId() throws Exception {
        mockMvc.perform(delete("/api/v1/admin/brands/9999").with(csrf()))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.requestId").exists());
    }
}
