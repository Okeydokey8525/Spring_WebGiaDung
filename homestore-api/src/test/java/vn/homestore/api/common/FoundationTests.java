package vn.homestore.api.common;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.WebApplicationContext;
import vn.homestore.api.common.web.RequestCorrelationFilter;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
class FoundationTests {

    @Autowired
    private WebApplicationContext context;
    
    @Autowired
    private RequestCorrelationFilter correlationFilter;

    private MockMvc mockMvc;

    @BeforeEach
    void setup() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.context)
            .addFilters(correlationFilter)
            .build();
    }

    @Test
    void testRequestCorrelationIdAndValidationError() throws Exception {
        String testJson = "{\"name\":\"\"}";
        
        MvcResult result = mockMvc.perform(post("/test/validation")
                .contentType(MediaType.APPLICATION_JSON)
                .content(testJson))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_PROBLEM_JSON))
                .andExpect(jsonPath("$.status").value(400))
                .andExpect(jsonPath("$.title").value("Validation Failed"))
                .andExpect(jsonPath("$.errors.name").exists())
                .andReturn();
                
        String requestIdHeader = result.getResponse().getHeader("X-Request-Id");
        assertThat(requestIdHeader).isNotNull();
    }

    @Test
    void testIncomingRequestIdPreserved() throws Exception {
        String customId = "my-custom-id-123";
        String testJson = "{\"name\":\"Valid Name\"}";
        
        mockMvc.perform(post("/test/validation")
                .header("X-Request-Id", customId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(testJson))
                .andExpect(status().isOk())
                .andExpect(header().string("X-Request-Id", customId));
    }
    
    @Test
    void testMissingRequestIdGeneratesNew() throws Exception {
        String testJson = "{\"name\":\"Valid Name\"}";
        
        MvcResult result = mockMvc.perform(post("/test/validation")
                .contentType(MediaType.APPLICATION_JSON)
                .content(testJson))
                .andExpect(status().isOk())
                .andReturn();
                
        String requestIdHeader = result.getResponse().getHeader("X-Request-Id");
        assertThat(requestIdHeader).isNotNull().isNotBlank();
    }
    
    @Test
    void testBlankRequestIdReplaced() throws Exception {
        String testJson = "{\"name\":\"Valid Name\"}";
        
        MvcResult result = mockMvc.perform(post("/test/validation")
                .header("X-Request-Id", "   ")
                .contentType(MediaType.APPLICATION_JSON)
                .content(testJson))
                .andExpect(status().isOk())
                .andReturn();
                
        String requestIdHeader = result.getResponse().getHeader("X-Request-Id");
        assertThat(requestIdHeader).isNotNull().isNotBlank().isNotEqualTo("   ");
    }
    
    @Test
    void testLongRequestIdReplaced() throws Exception {
        String testJson = "{\"name\":\"Valid Name\"}";
        String longId = "a".repeat(129);
        
        MvcResult result = mockMvc.perform(post("/test/validation")
                .header("X-Request-Id", longId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(testJson))
                .andExpect(status().isOk())
                .andReturn();
                
        String requestIdHeader = result.getResponse().getHeader("X-Request-Id");
        assertThat(requestIdHeader).isNotNull().isNotBlank().isNotEqualTo(longId);
    }
    
    @Test
    void testUnsafeRequestIdReplaced() throws Exception {
        String testJson = "{\"name\":\"Valid Name\"}";
        String unsafeId = "id<script>alert(1)</script>";
        
        MvcResult result = mockMvc.perform(post("/test/validation")
                .header("X-Request-Id", unsafeId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(testJson))
                .andExpect(status().isOk())
                .andReturn();
                
        String requestIdHeader = result.getResponse().getHeader("X-Request-Id");
        assertThat(requestIdHeader).isNotNull().isNotBlank().isNotEqualTo(unsafeId);
    }
}

@RestController
class TestController {
    
    public static class TestDto {
        @NotBlank
        private String name;
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
    }
    
    @PostMapping("/test/validation")
    public String testValidation(@Valid @RequestBody TestDto dto) {
        return "OK";
    }
}
