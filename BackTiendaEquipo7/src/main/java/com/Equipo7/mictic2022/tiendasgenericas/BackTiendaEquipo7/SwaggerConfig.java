package com.Equipo7.mictic2022.tiendasgenericas.BackTiendaEquipo7;

import java.util.Collections;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

	@Bean
	public Docket apiDocket() {
		// RECORDAR CAMBIAR EL PAQUETE BASE AL PAQUETE BO DE CADA UNO
		return new Docket(DocumentationType.SWAGGER_2).select()
				.apis(RequestHandlerSelectors
						.basePackage("com.Equipo7.mictic2022.tiendasgenericas.BackTiendaEquipo7.controller"))
				.paths(PathSelectors.any()).build().apiInfo(getApiInfo());
	}

	private ApiInfo getApiInfo() {
		return new ApiInfo("Api test Spring-Angular-MongoDB", 
				"Back-End Snow Market", "1.0", "",
				new Contact("", "", ""), "", "", Collections.emptyList());
	}
}