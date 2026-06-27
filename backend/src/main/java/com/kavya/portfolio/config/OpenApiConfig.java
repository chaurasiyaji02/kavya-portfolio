package com.kavya.portfolio.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

  @Bean
  OpenAPI portfolioOpenApi() {
    return new OpenAPI()
        .info(new Info()
            .title("Kavya Portfolio API")
            .description("Versioned REST API for the Kavya portfolio platform.")
            .version("v1")
            .contact(new Contact().name("Kavya Chaurasiya")));
  }
}
