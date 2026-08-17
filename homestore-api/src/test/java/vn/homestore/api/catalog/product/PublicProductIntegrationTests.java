package vn.homestore.api.catalog.product;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;
import vn.homestore.api.catalog.brand.domain.Brand;
import vn.homestore.api.catalog.brand.infrastructure.BrandRepository;
import vn.homestore.api.catalog.category.domain.Category;
import vn.homestore.api.catalog.category.infrastructure.CategoryRepository;
import vn.homestore.api.catalog.product.domain.Product;
import vn.homestore.api.catalog.product.domain.ProductStatus;
import vn.homestore.api.catalog.product.infrastructure.ProductRepository;
import vn.homestore.api.common.web.RequestCorrelationFilter;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@Transactional
class PublicProductIntegrationTests {

    @Autowired
    private WebApplicationContext context;

    @Autowired
    private RequestCorrelationFilter correlationFilter;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private BrandRepository brandRepository;

    private MockMvc mockMvc;
    private Category category;
    private Brand brand;

    @BeforeEach
    void setUp() {
        this.mockMvc = MockMvcBuilders
                .webAppContextSetup(context)
                .addFilters(correlationFilter)
                .apply(springSecurity())
                .build();

        Category testCategory = new Category(
                "Public Product Category",
                "public-product-category"
        );
        testCategory.setSortOrder(0);
        testCategory.setActive(true);
        category = categoryRepository.saveAndFlush(testCategory);

        brand = brandRepository.saveAndFlush(
                new Brand("Public Product Brand", "public-product-brand")
        );
    }

    @Test
    void shouldListOnlyActiveProductsForAnonymousUsers() throws Exception {
        productRepository.saveAndFlush(product(
                "Active One",
                "active-one",
                ProductStatus.ACTIVE
        ));
        productRepository.saveAndFlush(product(
                "Draft Hidden",
                "draft-hidden-list",
                ProductStatus.DRAFT
        ));
        productRepository.saveAndFlush(product(
                "Inactive Hidden",
                "inactive-hidden-list",
                ProductStatus.INACTIVE
        ));
        Product archived = product(
                "Archived Hidden",
                "archived-hidden-list",
                ProductStatus.ACTIVE
        );
        archived.archive();
        productRepository.saveAndFlush(archived);
        productRepository.saveAndFlush(product(
                "Active Two",
                "active-two",
                ProductStatus.ACTIVE
        ));

        mockMvc.perform(get("/api/v1/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.page").value(0))
                .andExpect(jsonPath("$.size").value(24))
                .andExpect(jsonPath("$.totalElements").value(2))
                .andExpect(jsonPath("$.totalPages").value(1))
                .andExpect(jsonPath("$.items", hasSize(2)))
                .andExpect(jsonPath("$.items[0].slug").value("active-two"))
                .andExpect(jsonPath("$.items[1].slug").value("active-one"))
                .andExpect(jsonPath("$.items[0].status").doesNotExist())
                .andExpect(jsonPath("$.items[0].createdAt").doesNotExist())
                .andExpect(jsonPath("$.items[0].price").doesNotExist())
                .andExpect(jsonPath("$.items[0].stock").doesNotExist());
    }

    @Test
    void shouldPaginateActiveProductsWithFixedNewestFirstOrdering() throws Exception {
        productRepository.saveAndFlush(product(
                "Page One",
                "page-one",
                ProductStatus.ACTIVE
        ));
        productRepository.saveAndFlush(product(
                "Page Two",
                "page-two",
                ProductStatus.ACTIVE
        ));
        productRepository.saveAndFlush(product(
                "Page Three",
                "page-three",
                ProductStatus.ACTIVE
        ));

        mockMvc.perform(get("/api/v1/products")
                        .param("page", "1")
                        .param("size", "2"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.page").value(1))
                .andExpect(jsonPath("$.size").value(2))
                .andExpect(jsonPath("$.totalElements").value(3))
                .andExpect(jsonPath("$.totalPages").value(2))
                .andExpect(jsonPath("$.items", hasSize(1)))
                .andExpect(jsonPath("$.items[0].slug").value("page-one"));
    }

    @Test
    void shouldReturnActiveProductDetailBySlugWithoutInternalState() throws Exception {
        Product active = new Product(
                category.getId(),
                brand.getId(),
                "Detail Product",
                "detail-product",
                "Short description",
                "Full public description",
                ProductStatus.ACTIVE,
                "SEO title",
                "SEO description"
        );
        productRepository.saveAndFlush(active);

        mockMvc.perform(get("/api/v1/products/{slug}", "detail-product"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Detail Product"))
                .andExpect(jsonPath("$.slug").value("detail-product"))
                .andExpect(jsonPath("$.categoryId").value(category.getId()))
                .andExpect(jsonPath("$.brandId").value(brand.getId()))
                .andExpect(jsonPath("$.shortDescription").value("Short description"))
                .andExpect(jsonPath("$.description").value("Full public description"))
                .andExpect(jsonPath("$.seoTitle").value("SEO title"))
                .andExpect(jsonPath("$.seoDescription").value("SEO description"))
                .andExpect(jsonPath("$.status").doesNotExist())
                .andExpect(jsonPath("$.createdAt").doesNotExist())
                .andExpect(jsonPath("$.updatedAt").doesNotExist())
                .andExpect(jsonPath("$.archivedAt").doesNotExist())
                .andExpect(jsonPath("$.price").doesNotExist())
                .andExpect(jsonPath("$.stock").doesNotExist());
    }

    @Test
    void shouldHideNonActiveProductDetails() throws Exception {
        productRepository.saveAndFlush(product(
                "Draft Product",
                "draft-hidden-detail",
                ProductStatus.DRAFT
        ));
        productRepository.saveAndFlush(product(
                "Inactive Product",
                "inactive-hidden-detail",
                ProductStatus.INACTIVE
        ));
        Product archived = product(
                "Archived Product",
                "archived-hidden-detail",
                ProductStatus.ACTIVE
        );
        archived.archive();
        productRepository.saveAndFlush(archived);

        mockMvc.perform(get(
                        "/api/v1/products/{slug}",
                        "draft-hidden-detail"
                ))
                .andExpect(status().isNotFound());

        mockMvc.perform(get(
                        "/api/v1/products/{slug}",
                        "inactive-hidden-detail"
                ))
                .andExpect(status().isNotFound());

        mockMvc.perform(get(
                        "/api/v1/products/{slug}",
                        "archived-hidden-detail"
                ))
                .andExpect(status().isNotFound());

        mockMvc.perform(get(
                        "/api/v1/products/{slug}",
                        "missing-product"
                ))
                .andExpect(status().isNotFound());
    }

    @Test
    void shouldRejectInvalidPublicPagination() throws Exception {
        mockMvc.perform(get("/api/v1/products")
                        .param("page", "-1"))
                .andExpect(status().isBadRequest());

        mockMvc.perform(get("/api/v1/products")
                        .param("size", "0"))
                .andExpect(status().isBadRequest());

        mockMvc.perform(get("/api/v1/products")
                        .param("size", "101"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void shouldKeepAdminProductsProtectedForAnonymousUsers() throws Exception {
        mockMvc.perform(get("/api/v1/admin/products"))
                .andExpect(status().isUnauthorized());
    }

    private Product product(
            String name,
            String slug,
            ProductStatus status
    ) {
        return new Product(
                category.getId(),
                brand.getId(),
                name,
                slug,
                null,
                null,
                status,
                null,
                null
        );
    }
}
