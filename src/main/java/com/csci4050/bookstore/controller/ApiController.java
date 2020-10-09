package com.csci4050.bookstore.controller;

import com.csci4050.bookstore.model.Book;
import com.csci4050.bookstore.model.Category;
import com.csci4050.bookstore.service.BookService;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.expression.spel.SpelEvaluationException;
// import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ApiController {
  @Autowired private BookService bookService;

  @GetMapping("/gen")
  public Book get() {
    Book book_1 =
        new Book(
            111,
            2011,
            15,
            5,
            2.50,
            4.12,
            "Book time",
            "nope",
            "5th",
            "UGA Publishing",
            Category.Action,
            Arrays.asList("Lennon Scariano"));
    Book book_2 =
        new Book(
            142,
            2013,
            25,
            50,
            2.50,
            4.12,
            "Book ayy",
            "yes",
            "5th",
            "UGA not publishing",
            Category.Art,
            Arrays.asList("Lennon Scariano"));
    bookService.save(book_1);
    bookService.save(book_2);
    return bookService.get(book_1.getBook_id());
  }

  @GetMapping("/books")
  public List<Book> getBooks(@RequestParam Map<String, String> filters) {

    return bookService.get(filters);
  }

  @GetMapping("/books/{id}")
  public Book getBook(@PathVariable int id) {
    return bookService.get(id);
  }

  @GetMapping("/books/categories")
  public List<Category> getCategories() {
    return Arrays.asList(Category.values());
  }
  /*
  @PostMapping("/example")
  public Example save(@RequestBody Example example) {
    exampleService.save(example);
    return example;
  }

  @GetMapping("/example/{id}")
  public Example get(@PathVariable int id) {
    return exampleService.get(id);
  }

  @DeleteMapping("/example/{id}")
  public String delete(@PathVariable int id) {
    exampleService.delete(id);
    return "Deleted example with id " + id + ".";
  }

  @PutMapping("/example")
  public Book update(@RequestBody Example example) {
    exampleService.save(example);
    return example;
  }
  */
}
