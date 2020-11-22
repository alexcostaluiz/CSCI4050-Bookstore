package com.csci4050.bookstore.dto;

import com.csci4050.bookstore.json.BookMapDeserializer;
import com.csci4050.bookstore.json.BookMapSerializer;
import com.csci4050.bookstore.model.Book;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import java.util.Map;

public class CartDto {

  @JsonDeserialize(keyUsing = BookMapDeserializer.class)
  @JsonSerialize(keyUsing = BookMapSerializer.class)
  private Map<Book, Integer> books;

  public Map<Book, Integer> getBooks() {
    return this.books;
  }

  public void setBooks(Map<Book, Integer> books) {
    this.books = books;
  }
}
