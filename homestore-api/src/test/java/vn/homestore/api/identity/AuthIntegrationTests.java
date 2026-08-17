package vn.homestore.api.identity;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;
import tools.jackson.databind.ObjectMapper;
import tools.jackson.databind.json.JsonMapper;
import vn.homestore.api.common.web.RequestCorrelationFilter;
import vn.homestore.api.identity.api.LoginRequest;
import vn.homestore.api.identity.api.RegisterRequest;
import vn.homestore.api.identity.domain.UserAccount;
import vn.homestore.api.identity.domain.UserRole;
import vn.homestore.api.identity.infrastructure.UserAccountRepository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@Transactional
class AuthIntegrationTests {

    @Autowired
    private WebApplicationContext context;

    @Autowired
    private RequestCorrelationFilter correlationFilter;

    @Autowired
    private UserAccountRepository userAccountRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private MockMvc mockMvc;

    private final ObjectMapper objectMapper =
            JsonMapper.builder().findAndAddModules().build();

    @BeforeEach
    void setUp() {
        this.mockMvc = MockMvcBuilders
                .webAppContextSetup(context)
                .addFilters(correlationFilter)
                .apply(springSecurity())
                .build();
    }

    @Test
    void shouldExposeCsrfTokenBeforeAuthentication() throws Exception {
        mockMvc.perform(get("/api/v1/auth/csrf"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.headerName").value("X-CSRF-TOKEN"))
                .andExpect(jsonPath("$.parameterName").value("_csrf"))
                .andExpect(jsonPath("$.token").isNotEmpty());
    }

    @Test
    void shouldRegisterCustomerWithNormalizedEmailAndName() throws Exception {
        RegisterRequest request = new RegisterRequest(
                "Nguyen   Van A",
                "TEST.USER@Example.COM",
                "StrongPass123",
                "StrongPass123"
        );

        mockMvc.perform(post("/api/v1/auth/register")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.fullName").value("Nguyen Van A"))
                .andExpect(jsonPath("$.email").value("test.user@example.com"))
                .andExpect(jsonPath("$.role").value("CUSTOMER"))
                .andExpect(jsonPath("$.passwordHash").doesNotExist());

        UserAccount account = userAccountRepository
                .findByEmail("test.user@example.com")
                .orElseThrow();

        assertThat(account.getPasswordHash()).isNotEqualTo("StrongPass123");
        assertThat(passwordEncoder.matches("StrongPass123", account.getPasswordHash()))
                .isTrue();
        assertThat(account.getRole()).isEqualTo(UserRole.CUSTOMER);
    }

    @Test
    void shouldRejectDuplicateEmailCaseInsensitively() throws Exception {
        userAccountRepository.saveAndFlush(new UserAccount(
                "Existing User",
                "duplicate@example.com",
                passwordEncoder.encode("StrongPass123"),
                UserRole.CUSTOMER
        ));

        RegisterRequest request = new RegisterRequest(
                "Other User",
                "DUPLICATE@EXAMPLE.COM",
                "StrongPass123",
                "StrongPass123"
        );

        mockMvc.perform(post("/api/v1/auth/register")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.title").value("Resource Conflict"));
    }

    @Test
    void shouldRejectPasswordConfirmationMismatch() throws Exception {
        RegisterRequest request = new RegisterRequest(
                "Mismatch User",
                "mismatch@example.com",
                "StrongPass123",
                "DifferentPass123"
        );

        mockMvc.perform(post("/api/v1/auth/register")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Invalid Request"));
    }

    @Test
    void shouldLoginAndPersistAuthenticationInSession() throws Exception {
        userAccountRepository.saveAndFlush(new UserAccount(
                "Session User",
                "session@example.com",
                passwordEncoder.encode("StrongPass123"),
                UserRole.CUSTOMER
        ));

        LoginRequest request = new LoginRequest(
                "SESSION@EXAMPLE.COM",
                "StrongPass123"
        );

        MvcResult loginResult = mockMvc.perform(post("/api/v1/auth/login")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("session@example.com"))
                .andExpect(jsonPath("$.role").value("CUSTOMER"))
                .andReturn();

        MockHttpSession session =
                (MockHttpSession) loginResult.getRequest().getSession(false);

        assertThat(session).isNotNull();

        mockMvc.perform(get("/api/v1/auth/me").session(session))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("session@example.com"));
    }

    @Test
    void shouldReturnUnauthorizedForInvalidCredentials() throws Exception {
        userAccountRepository.saveAndFlush(new UserAccount(
                "Login User",
                "login@example.com",
                passwordEncoder.encode("StrongPass123"),
                UserRole.CUSTOMER
        ));

        LoginRequest request = new LoginRequest(
                "login@example.com",
                "WrongPass123"
        );

        mockMvc.perform(post("/api/v1/auth/login")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized())
                .andExpect(content().contentTypeCompatibleWith(
                        MediaType.APPLICATION_PROBLEM_JSON))
                .andExpect(jsonPath("$.title").value("Authentication Failed"));
    }

    @Test
    void shouldRejectAnonymousAdminRequest() throws Exception {
        mockMvc.perform(get("/api/v1/admin/products"))
                .andExpect(status().isUnauthorized())
                .andExpect(content().contentTypeCompatibleWith(
                        MediaType.APPLICATION_PROBLEM_JSON))
                .andExpect(jsonPath("$.title").value("Authentication Required"));
    }

    @Test
    @WithMockUser(roles = "CUSTOMER")
    void shouldRejectCustomerFromAdminApi() throws Exception {
        mockMvc.perform(get("/api/v1/admin/products"))
                .andExpect(status().isForbidden())
                .andExpect(content().contentTypeCompatibleWith(
                        MediaType.APPLICATION_PROBLEM_JSON))
                .andExpect(jsonPath("$.title").value("Access Denied"));
    }
}
