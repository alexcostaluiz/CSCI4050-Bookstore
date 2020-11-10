package com.csci4050.bookstore;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class BookstoreApplication {

  @Autowired private ObjectMapper objectMapper;

  public static void main(String[] args) {
    SpringApplication.run(BookstoreApplication.class, args);
  }

  //add time module to object mapper so localdate time can be deserialized
  @PostConstruct
  public void setUp() {
    objectMapper.registerModule(new JavaTimeModule());
  }


  //Global cors config
  @Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedOrigins("http://localhost:8080", "http://localhost:3000", "http://192.168.1.19:3000", "http://192.168.1.19:8080");
			}
		};
	}
}
