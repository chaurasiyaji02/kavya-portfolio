package com.kavya.portfolio.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

  @Bean
  OpenAPI portfolioOpenApi() {
    return new OpenAPI()
        .components(new Components().addSecuritySchemes(
            "bearerAuth",
            new SecurityScheme()
                .type(SecurityScheme.Type.HTTP)
                .scheme("bearer")
                .bearerFormat("JWT")))
        .info(new Info()
            .title("Kavya Portfolio API")
            .description("Public portfolio and contact APIs with JWT-protected admin operations.")
            .version("v1")
            .contact(new Contact().name("Kavya Chaurasiya")));
  }
}
