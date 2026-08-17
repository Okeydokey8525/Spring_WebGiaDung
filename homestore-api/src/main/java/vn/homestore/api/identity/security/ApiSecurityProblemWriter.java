package vn.homestore.api.identity.security;

import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.MDC;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ProblemDetail;
import org.springframework.stereotype.Component;
import tools.jackson.databind.ObjectMapper;
import vn.homestore.api.common.web.RequestCorrelationFilter;

import java.io.IOException;

@Component
public class ApiSecurityProblemWriter {

    private final ObjectMapper objectMapper;

    public ApiSecurityProblemWriter(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public void write(
            HttpServletResponse response,
            HttpStatus status,
            String title,
            String detail
    ) throws IOException {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(status, detail);
        problemDetail.setTitle(title);

        String requestId = MDC.get(RequestCorrelationFilter.REQUEST_ID_MDC_KEY);
        if (requestId != null) {
            problemDetail.setProperty("requestId", requestId);
        }

        response.setStatus(status.value());
        response.setContentType(MediaType.APPLICATION_PROBLEM_JSON_VALUE);
        objectMapper.writeValue(response.getOutputStream(), problemDetail);
    }
}
