package vn.homestore.api.catalog.product;

import org.junit.jupiter.api.AfterEach;
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
import tools.jackson.databind.ObjectMapper;
import tools.jackson.databind.json.JsonMapper;
import vn.homestore.api.common.web.RequestCorrelationFilter;
import vn.homestore.api.catalog.brand.domain.Brand;
import vn.homestore.api.catalog.brand.infrastructure.BrandRepository;
import vn.homestore.api.catalog.category.domain.Category;
import vn.homestore.api.catalog.category.infrastructure.CategoryRepository;
import vn.homestore.api.catalog.product.api.CreateProductRequest;
import vn.homestore.api.catalog.product.api.UpdateProductRequest;
import vn.homestore.api.catalog.product.domain.Product;
import vn.homestore.api.catalog.product.domain.ProductStatus;
import vn.homestore.api.catalog.product.infrastructure.ProductRepository;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.containsString;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;

@SpringBootTest
@Transactional
class ProductIntegrationTests {

    @Autowired
    private WebApplicationContext context;

    private MockMvc mockMvc;

    private ObjectMapper objectMapper = JsonMapper.builder().findAndAddModules().build();

    @Autowired
    private RequestCorrelationFilter correlationFilter;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private BrandRepository brandRepository;

    @Autowired
    private vn.homestore.api.catalog.productattribute.infrastructure.ProductAttributeRepository productAttributeRepository;

    @Autowired
    private vn.homestore.api.catalog.productattribute.infrastructure.ProductAttributeValueRepository productAttributeValueRepository;

    private Category testCategory;
    private Brand testBrand;

    @BeforeEach
    void setUp() {
        this.mockMvc = MockMvcBuilders
            .webAppContextSetup(context)
            .addFilters(correlationFilter)
            .apply(springSecurity())
            .build();

        Category category = new Category("Electronics Prod", "electronics-prod");
        category.setSortOrder(0);
        category.setActive(true);
        testCategory = categoryRepository.saveAndFlush(category);

        testBrand = brandRepository.saveAndFlush(new Brand("Sony Prod", "sony-prod"));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldCreateProductWithCategoryWithoutBrand() throws Exception {
        CreateProductRequest request = new CreateProductRequest(
                testCategory.getId(), null, "Test Product", null, null, null, null, null, null);

        mockMvc.perform(post("/api/v1/admin/products").with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("Test Product"))
                .andExpect(jsonPath("$.slug").value("test-product"))
                .andExpect(jsonPath("$.categoryId").value(testCategory.getId()))
                .andExpect(jsonPath("$.status").value("DRAFT"));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldCreateProductWithBrand() throws Exception {
        CreateProductRequest request = new CreateProductRequest(
                testCategory.getId(), testBrand.getId(), "Test Product", null, null, null, null, null, null);

        mockMvc.perform(post("/api/v1/admin/products").with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.brandId").value(testBrand.getId()));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldRejectCreateProductMissingCategory() throws Exception {
        CreateProductRequest request = new CreateProductRequest(
                9999L, null, "Test Product", null, null, null, null, null, null);

        mockMvc.perform(post("/api/v1/admin/products").with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldRejectCreateProductMissingBrand() throws Exception {
        CreateProductRequest request = new CreateProductRequest(
                testCategory.getId(), 9999L, "Test Product", null, null, null, null, null, null);

        mockMvc.perform(post("/api/v1/admin/products").with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldNormalizeProductName() throws Exception {
        CreateProductRequest request = new CreateProductRequest(
                testCategory.getId(), null, "  Nồi   cơm điện  ", null, null, null, null, null, null);

        mockMvc.perform(post("/api/v1/admin/products").with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("Nồi cơm điện"))
                .andExpect(jsonPath("$.slug").value("noi-com-dien"));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldRejectDuplicateSlug() throws Exception {
        productRepository.saveAndFlush(new Product(testCategory.getId(), null, "Product 1", "prod-1", null, null, null, null, null));

        CreateProductRequest request = new CreateProductRequest(
                testCategory.getId(), null, "Product 2", "prod-1", null, null, null, null, null);

        mockMvc.perform(post("/api/v1/admin/products").with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.detail").value(containsString("already exists")));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldAllowSameNameDifferentSlug() throws Exception {
        productRepository.saveAndFlush(new Product(testCategory.getId(), null, "Same Name", "slug-1", null, null, null, null, null));

        CreateProductRequest request = new CreateProductRequest(
                testCategory.getId(), null, "Same Name", "slug-2", null, null, null, null, null);

        mockMvc.perform(post("/api/v1/admin/products").with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldRejectBlankName() throws Exception {
        CreateProductRequest request = new CreateProductRequest(
                testCategory.getId(), null, "   ", null, null, null, null, null, null);

        mockMvc.perform(post("/api/v1/admin/products").with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldCreateProductWithActiveStatus() throws Exception {
        CreateProductRequest request = new CreateProductRequest(
                testCategory.getId(), null, "Test Product", null, null, null, ProductStatus.ACTIVE, null, null);

        mockMvc.perform(post("/api/v1/admin/products").with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.status").value("ACTIVE"));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldRejectCreateArchivedProduct() throws Exception {
        CreateProductRequest request = new CreateProductRequest(
                testCategory.getId(), null, "Test Product", null, null, null, ProductStatus.ARCHIVED, null, null);

        mockMvc.perform(post("/api/v1/admin/products").with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldUpdateProduct() throws Exception {
        Product product = productRepository.saveAndFlush(new Product(testCategory.getId(), testBrand.getId(), "Old Name", "old-slug", "desc", "full desc", ProductStatus.DRAFT, "title", "seo desc"));

        UpdateProductRequest request = new UpdateProductRequest(
                testCategory.getId(), null, "New Name", "new-slug", null, null, ProductStatus.ACTIVE, null, null);

        mockMvc.perform(put("/api/v1/admin/products/{id}", product.getId()).with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("New Name"))
                .andExpect(jsonPath("$.slug").value("new-slug"))
                .andExpect(jsonPath("$.brandId").isEmpty())
                .andExpect(jsonPath("$.shortDescription").isEmpty())
                .andExpect(jsonPath("$.status").value("ACTIVE"));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldRejectUpdateToArchivedStatus() throws Exception {
        Product product = productRepository.saveAndFlush(new Product(testCategory.getId(), null, "Old Name", "old-slug", null, null, ProductStatus.DRAFT, null, null));

        UpdateProductRequest request = new UpdateProductRequest(
                testCategory.getId(), null, "New Name", "new-slug", null, null, ProductStatus.ARCHIVED, null, null);

        mockMvc.perform(put("/api/v1/admin/products/{id}", product.getId()).with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldArchiveProduct() throws Exception {
        Product product = productRepository.saveAndFlush(new Product(testCategory.getId(), null, "Old Name", "old-slug", null, null, ProductStatus.DRAFT, null, null));

        mockMvc.perform(delete("/api/v1/admin/products/{id}", product.getId()).with(csrf()))
                .andExpect(status().isNoContent());

        Optional<Product> archived = productRepository.findById(product.getId());
        assertThat(archived).isPresent();
        assertThat(archived.get().getStatus()).isEqualTo(ProductStatus.ARCHIVED);
        assertThat(archived.get().getArchivedAt()).isNotNull();
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldRejectUpdateArchivedProduct() throws Exception {
        Product product = productRepository.saveAndFlush(new Product(testCategory.getId(), null, "Old Name", "old-slug", null, null, ProductStatus.DRAFT, null, null));
        product.archive();
        productRepository.saveAndFlush(product);

        UpdateProductRequest request = new UpdateProductRequest(
                testCategory.getId(), null, "New Name", "new-slug", null, null, ProductStatus.ACTIVE, null, null);

        mockMvc.perform(put("/api/v1/admin/products/{id}", product.getId()).with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isConflict());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldAllowIdempotentArchive() throws Exception {
        Product product = productRepository.saveAndFlush(new Product(testCategory.getId(), null, "Old Name", "old-slug", null, null, ProductStatus.DRAFT, null, null));
        
        mockMvc.perform(delete("/api/v1/admin/products/{id}", product.getId()).with(csrf()))
                .andExpect(status().isNoContent());
                
        Product archivedOnce = productRepository.findById(product.getId()).orElseThrow();
        var archivedAt1 = archivedOnce.getArchivedAt();
        
        mockMvc.perform(delete("/api/v1/admin/products/{id}", product.getId()).with(csrf()))
                .andExpect(status().isNoContent());
                
        Product archivedTwice = productRepository.findById(product.getId()).orElseThrow();
        assertThat(archivedTwice.getArchivedAt()).isEqualTo(archivedAt1);
    }
    
    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldRejectDeleteCategoryReferencedByProduct() throws Exception {
        productRepository.saveAndFlush(new Product(testCategory.getId(), null, "Product 1", "prod-1", null, null, null, null, null));
        
        mockMvc.perform(delete("/api/v1/admin/categories/{id}", testCategory.getId()).with(csrf()))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.detail").value(containsString("cannot be deleted while it is used by products")));
    }
    
    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldRejectDeleteBrandReferencedByArchivedProduct() throws Exception {
        Product product = new Product(testCategory.getId(), testBrand.getId(), "Product 1", "prod-1", null, null, null, null, null);
        product.archive();
        productRepository.saveAndFlush(product);
        
        mockMvc.perform(delete("/api/v1/admin/brands/{id}", testBrand.getId()).with(csrf()))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.detail").value(containsString("cannot be deleted while it is used by products")));
    }
}
