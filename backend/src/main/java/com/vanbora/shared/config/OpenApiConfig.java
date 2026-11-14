package com.vanbora.shared.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("VanBora API — Marketplace de Transporte por Vans")
                        .version("v1.0.0")
                        .description("API RESTful do VanBora para conexão de famílias, grupos e empresas a motoristas autônomos de vans na Grande SP.")
                        .contact(new Contact()
                                .name("Suporte VanBora")
                                .email("suporte@vanbora.com.br"))
                        .license(new License().name("Apache 2.0").url("https://vanbora.com.br/license")))
                .addSecurityItem(new SecurityRequirement().addList("BearerAuth"))
                .components(new Components()
                        .addSecuritySchemes("BearerAuth", new SecurityScheme()
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")
                                .description("Insira seu token JWT gerado no endpoint /api/v1/auth/login")));
    }
}
