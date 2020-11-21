package com.csci4050.bookstore;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import java.util.TimeZone;
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@EnableScheduling
public class BookstoreApplication {

  @Autowired private ObjectMapper objectMapper;

  public static void main(String[] args) {

    SpringApplication.run(BookstoreApplication.class, args);
  }

  // add time module to object mapper so localdate time can be deserialized
  @PostConstruct
  public void setUp() {
    TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
    objectMapper.registerModule(new JavaTimeModule());
  }

  // Global cors config
  @Bean
  public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {
      @Override
      public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedOrigins("*")
        .allowedMethods("*").allowedHeaders("*");
      }
    };
  }
}
