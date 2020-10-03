package com.csci4050.bookstore.controller;

import com.csci4050.bookstore.model.Book;
import com.csci4050.bookstore.model.Category;
import com.csci4050.bookstore.service.BookService;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.expression.spel.SpelEvaluationException;
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
  /*
    @GetMapping("/gen")
    public Book get() {
      Book book = new Book(111, 2011, 15, 5, 2.50, 4.12, "Book time", "nope", "5th", "UGA Publishing", Category.Action, Arrays.asList("Lennon Scariano"));
      bookService.save(book);
      return bookService.get(book.getBook_id());
    }
  */
  @ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "Incorrect ") // 404
  @GetMapping("/books")
  public List<Book> getAllBooks(@RequestParam Map<String, String> filters) {
    try {
      return bookService.get(filters);
    } catch (SpelEvaluationException e) {
      e.printStackTrace();
    }
  }

  @GetMapping("/books/{id}")
  public Book getBooks(@PathVariable int id) {
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
  public Example update(@RequestBody Example example) {
    exampleService.save(example);
    return example;
  }
  */
}
