package com.nextalx.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * Optional API-key protection for the API.
 *
 * <p>Disabled by default: when {@code app.api-key} (env {@code APP_API_KEY}) is
 * empty, every request passes through unchanged — this keeps the open demo
 * working. When the property is set, requests under {@code /api/v1/**} must send
 * a matching {@code X-API-Key} header. Actuator, Swagger and CORS pre-flight
 * requests are always allowed.
 */
@Component
public class ApiKeyFilter extends OncePerRequestFilter {

    private static final String API_KEY_HEADER = "X-API-Key";

    @Value("${app.api-key:}")
    private String apiKey;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        boolean enabled = apiKey != null && !apiKey.isBlank();

        boolean guarded =
                request.getRequestURI().startsWith("/api/v1")
                        && !HttpMethod.OPTIONS.matches(request.getMethod());

        if (enabled && guarded) {

            String provided = request.getHeader(API_KEY_HEADER);

            if (!apiKey.equals(provided)) {

                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                response.setHeader(
                        HttpHeaders.WWW_AUTHENTICATE,
                        API_KEY_HEADER
                );
                response.getWriter().write(
                        "{\"status\":401,\"message\":\"Missing or invalid API key.\"}"
                );
                return;
            }
        }

        filterChain.doFilter(request, response);
    }
}
