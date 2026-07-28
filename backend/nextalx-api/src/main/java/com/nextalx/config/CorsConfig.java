package com.nextalx.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig
        implements WebMvcConfigurer {

    /**
     * Comma-separated list of allowed origins. Configure the deployed frontend
     * URL(s) via the APP_CORS_ALLOWED_ORIGINS environment variable in production.
     * Defaults to the local Vite dev-server ports.
     */
    @Value("${app.cors.allowed-origins:http://localhost:5173,http://localhost:5174,http://localhost:5175}")
    private String[] allowedOrigins;

    @Override
    public void addCorsMappings(
            CorsRegistry registry
    ) {

        registry.addMapping("/**")
                .allowedOrigins(
                        allowedOrigins
                )
                .allowedMethods(
                        "*"
                )
                .allowedHeaders(
                        "*"
                );
    }
}
