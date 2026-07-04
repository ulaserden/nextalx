package com.nextalx.config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI nextalxOpenAPI() {

        return new OpenAPI()

                .info(
                        new Info()
                                .title("Nextalx API")
                                .description(
                                        "Enterprise IT Asset Management Platform API"
                                )
                                .version("v1.0.0")
                                .contact(
                                        new Contact()
                                                .name("Melik Ulaş Erden")
                                                .url(
                                                        "https://github.com/ulaserden/nextalx"
                                                )
                                                .email(
                                                        "contact@nextalx.com"
                                                )
                                )
                                .license(
                                        new License()
                                                .name("MIT License")
                                                .url(
                                                        "https://opensource.org/licenses/MIT"
                                                )
                                )
                )

                .externalDocs(
                        new ExternalDocumentation()
                                .description(
                                        "Nextalx GitHub Repository"
                                )
                                .url(
                                        "https://github.com/ulaserden/nextalx"
                                )
                );
    }
}