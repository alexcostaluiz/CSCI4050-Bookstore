package com.csci4050.bookstore.controller;

import com.csci4050.bookstore.exceptions.FilterException;
import com.csci4050.bookstore.model.Book;
import com.csci4050.bookstore.model.Category;
import com.csci4050.bookstore.service.BookService;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ApiController {
  @Autowired private BookService bookService;

  @GetMapping("/books")
  public List<Book> getBooks(@RequestParam Map<String, String> filters) {
    try {
      return bookService.get(filters);
    } catch (NoSuchFieldException e) {
      throw new FilterException();
    } catch (IllegalArgumentException e) {
      throw new FilterException();
    }
  }

  @GetMapping("/books/{id}")
  public Book getBook(@PathVariable int id) {
    return bookService.get(id);
  }

  @GetMapping("/books/categories")
  public List<Category> getCategories() {
    return Arrays.asList(Category.values());
  }

  
}
