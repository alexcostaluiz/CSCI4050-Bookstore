package com.csci4050.bookstore.controller;

import com.csci4050.bookstore.exceptions.FilterException;
import com.csci4050.bookstore.model.Book;
import com.csci4050.bookstore.model.Category;
import com.csci4050.bookstore.service.BookService;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/books")
public class BookController {
  @Autowired private BookService bookService;

  @GetMapping("/get/{id}")
  public Book getBook(@PathVariable int id) {
    return bookService.get(id);
  }

  @GetMapping("/get")
  public List<Book> getBooks(@RequestParam Map<String, String> filters) {
    try {
      return bookService.get(filters);
    } catch (NoSuchFieldException e) {
      throw new FilterException();
    } catch (IllegalArgumentException e) {
      throw new FilterException();
    }
  }

  @GetMapping("/get/categories")
  public List<Category> getCategories() {
    return Arrays.asList(Category.values());
  }

  @PostMapping(value = "/create", consumes = "application/json", produces = "application/json")
  public void createBook(@RequestBody Book book) {
    try {
      bookService.save(book);
    } catch (DataIntegrityViolationException e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Book isbn already exists.");
    }
    
  }

  @DeleteMapping(value = "/archive", consumes = "application/json", produces = "application/json")
  public void archiveBook(@RequestBody Book book) {
    book.setArchived(true);
    bookService.update(book);
  }

  @PostMapping(value = "/update", consumes = "application/json", produces = "application/json")
  public void updateBook(@RequestBody Book book) {
    bookService.update(book);
  }
}
