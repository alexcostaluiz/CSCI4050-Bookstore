package com.csci4050.bookstore;

import com.csci4050.bookstore.model.Book;
import com.csci4050.bookstore.service.BookService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.KeyDeserializer;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;

public class MyBookDeserializer extends KeyDeserializer {

  @Autowired BookService bookService;

  @Override
  public Book deserializeKey(String key, DeserializationContext ctxt)
      throws IOException, JsonProcessingException {
    int id = Integer.parseInt(key);
    return bookService.get(id);
  }
}
