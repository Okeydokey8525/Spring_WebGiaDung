package vn.homestore.api.catalog.category;

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
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;
import vn.homestore.api.catalog.category.api.CategoryResponse;
import vn.homestore.api.catalog.category.api.CreateCategoryRequest;
import vn.homestore.api.catalog.category.api.UpdateCategoryRequest;
import vn.homestore.api.catalog.category.infrastructure.CategoryRepository;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.assertj.core.api.Assertions.assertThat;
import vn.homestore.api.common.web.RequestCorrelationFilter;

import org.springframework.web.context.WebApplicationContext;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;

@SpringBootTest
@Transactional // Rollback after each test
class CategoryIntegrationTests {

    @Autowired
    private WebApplicationContext context;

    private MockMvc mockMvc;

    private ObjectMapper objectMapper = JsonMapper.builder().findAndAddModules().build();

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private RequestCorrelationFilter correlationFilter;

    @BeforeEach
    void setUp() {
        this.mockMvc = MockMvcBuilders
            .webAppContextSetup(context)
            .addFilters(correlationFilter)
            .apply(springSecurity())
            .build();
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldCreateRootCategory() throws Exception {
        CreateCategoryRequest request = new CreateCategoryRequest("Electronics", null, null, "All electronics", null, 10, true, null, null);

        mockMvc.perform(post("/api/v1/admin/categories")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("Electronics"))
                .andExpect(jsonPath("$.slug").value("electronics"))
                .andExpect(jsonPath("$.parentId").isEmpty())
                .andExpect(jsonPath("$.sortOrder").value(10))
                .andExpect(jsonPath("$.active").value(true));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldCreateChildCategory() throws Exception {
        CategoryResponse root = createCategory("Parent", null);
        
        CreateCategoryRequest request = new CreateCategoryRequest("Child", null, root.id(), null, null, null, null, null, null);

        mockMvc.perform(post("/api/v1/admin/categories")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.parentId").value(root.id()))
                .andExpect(jsonPath("$.slug").value("child"));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldGenerateVietnameseSlug() throws Exception {
        CreateCategoryRequest request = new CreateCategoryRequest("Đồ Gia Dụng", null, null, null, null, null, null, null, null);

        mockMvc.perform(post("/api/v1/admin/categories")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.slug").value("do-gia-dung"));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldRejectDuplicateSlug() throws Exception {
        createCategory("Electronics", "electronics", null, true);

        CreateCategoryRequest request = new CreateCategoryRequest("Electronics 2", "electronics", null, null, null, null, null, null, null);

        mockMvc.perform(post("/api/v1/admin/categories")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.title").value("Resource Conflict"))
                .andExpect(jsonPath("$.requestId").exists());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldRejectMissingParent() throws Exception {
        CreateCategoryRequest request = new CreateCategoryRequest("Child", null, 9999L, null, null, null, null, null, null);

        mockMvc.perform(post("/api/v1/admin/categories")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.title").value("Resource Not Found"))
                .andExpect(jsonPath("$.requestId").exists());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldUpdateCategory() throws Exception {
        CategoryResponse cat = createCategory("Old Name", null);

        UpdateCategoryRequest request = new UpdateCategoryRequest("New Name", null, null, "desc", null, 5, false, null, null);

        mockMvc.perform(put("/api/v1/admin/categories/" + cat.id())
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("New Name"))
                .andExpect(jsonPath("$.slug").value("new-name"))
                .andExpect(jsonPath("$.sortOrder").value(5))
                .andExpect(jsonPath("$.active").value(false));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldRejectDirectSelfParent() throws Exception {
        CategoryResponse cat = createCategory("Root", null);

        UpdateCategoryRequest request = new UpdateCategoryRequest("Root", "root", cat.id(), null, null, 0, true, null, null);

        mockMvc.perform(put("/api/v1/admin/categories/" + cat.id())
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.title").value("Resource Conflict"));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldRejectIndirectCycle() throws Exception {
        CategoryResponse a = createCategory("A", null);
        CategoryResponse b = createCategory("B", a.id());
        CategoryResponse c = createCategory("C", b.id());

        UpdateCategoryRequest request = new UpdateCategoryRequest("A", "a", c.id(), null, null, 0, true, null, null);

        mockMvc.perform(put("/api/v1/admin/categories/" + a.id())
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.title").value("Resource Conflict"));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldRejectDeletingParentWithChildren() throws Exception {
        CategoryResponse root = createCategory("Root", null);
        createCategory("Child", root.id());

        mockMvc.perform(delete("/api/v1/admin/categories/" + root.id())
                        .with(csrf()))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.title").value("Resource Conflict"));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldDeleteLeafCategory() throws Exception {
        CategoryResponse cat = createCategory("Leaf", null);

        mockMvc.perform(delete("/api/v1/admin/categories/" + cat.id())
                        .with(csrf()))
                .andExpect(status().isNoContent());

        assertThat(categoryRepository.existsById(cat.id())).isFalse();
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldRejectBlankName() throws Exception {
        CreateCategoryRequest request = new CreateCategoryRequest("", null, null, null, null, null, null, null, null);

        mockMvc.perform(post("/api/v1/admin/categories")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Validation Failed"));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldRejectNegativeSortOrder() throws Exception {
        CreateCategoryRequest request = new CreateCategoryRequest("Negative", null, null, null, null, -1, null, null, null);

        mockMvc.perform(post("/api/v1/admin/categories")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Validation Failed"));
    }

    @Test
    @WithAnonymousUser
    void shouldReturnOnlyActiveHierarchy() throws Exception {
        CategoryResponse activeRoot = createCategory("Active Root", null, null, true);
        CategoryResponse activeChild = createCategory("Active Child", null, activeRoot.id(), true);
        CategoryResponse inactiveRoot = createCategory("Inactive Root", null, null, false);
        CategoryResponse activeChildOfInactive = createCategory("Hidden Child", null, inactiveRoot.id(), true);

        mockMvc.perform(get("/api/v1/categories"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].name").value("Active Root"))
                .andExpect(jsonPath("$[0].children.length()").value(1))
                .andExpect(jsonPath("$[0].children[0].name").value("Active Child"));
    }

    @Test
    @WithAnonymousUser
    void shouldReturn404ForInactiveSlug() throws Exception {
        createCategory("Inactive Cat", "inactive-cat", null, false);

        mockMvc.perform(get("/api/v1/categories/inactive-cat"))
                .andExpect(status().isNotFound());
    }

    @Test
    @WithAnonymousUser
    void shouldReturn404ForActiveChildOfInactiveParentSlug() throws Exception {
        CategoryResponse inactiveRoot = createCategory("Inactive Root", "inactive-root", null, false);
        createCategory("Active Child", "active-child", inactiveRoot.id(), true);

        mockMvc.perform(get("/api/v1/categories/active-child"))
                .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldReturnInactiveCategoriesInAdminList() throws Exception {
        createCategory("Inactive Cat", "inactive-cat", null, false);

        mockMvc.perform(get("/api/v1/admin/categories"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].name").value("Inactive Cat"));
    }

    private CategoryResponse createCategory(String name, Long parentId) throws Exception {
        return createCategory(name, null, parentId, true);
    }
    
    private CategoryResponse createCategory(String name, String slug, Long parentId, boolean active) throws Exception {
        CreateCategoryRequest request = new CreateCategoryRequest(name, slug, parentId, null, null, 0, active, null, null);
        MvcResult result = mockMvc.perform(post("/api/v1/admin/categories")
                        .with(user("fixture-admin").roles("ADMIN"))
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andReturn();
        return objectMapper.readValue(result.getResponse().getContentAsString(), CategoryResponse.class);
    }
}
