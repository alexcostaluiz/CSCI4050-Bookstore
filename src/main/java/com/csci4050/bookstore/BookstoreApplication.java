package com.csci4050.bookstore;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
@EnableWebMvc
public class BookstoreApplication {
  public static void main(String[] args) {
    SpringApplication.run(BookstoreApplication.class, args);
  }
}
