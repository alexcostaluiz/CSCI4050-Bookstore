package com.csci4050.bookstore.controller;

import com.csci4050.bookstore.exceptions.FilterException;
import com.csci4050.bookstore.model.Book;
import com.csci4050.bookstore.model.Promotion;
import com.csci4050.bookstore.service.BookService;
import com.csci4050.bookstore.service.PromoService;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
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
@RequestMapping("/promos")
public class PromoController {
  @Autowired private PromoService promoService;
  @Autowired private BookService bookService;

  @GetMapping("/get/{id}")
  public Promotion getPromo(@PathVariable int id) {
    return promoService.get(id);
  }

  @GetMapping("/get")
  public List<Promotion> getPromos(@RequestParam Map<String, String> filters) {
    try {
      return promoService.get(filters);
    } catch (NoSuchFieldException e) {
      throw new FilterException();
    } catch (IllegalArgumentException e) {
      throw new FilterException();
    }
  }

  /**
   * Adds promo to database, only with existing books. Searches by book id, and throws error 422 if
   * any book doesn't exist
   *
   * @param promo
   */
  @PostMapping(value = "/create", consumes = "application/json", produces = "application/json")
  public void createPromo(@RequestBody Promotion promo) {
    try {
      List<Book> books = promo.getBooks();
      for (int i = 0; i < books.size(); i++) {
        Book book = bookService.get(books.get(i).getId());
        book.setPromo(promo);
        books.set(i, book);
      }
      promo.setBooks(books);
      promoService.save(promo);
    } catch (NullPointerException e) {
      throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "Book id not found", e);
    }
  }

  @DeleteMapping(value = "/delete", consumes = "application/json", produces = "application/json")
  public void deletePromo(@RequestBody Promotion promo) {
    promoService.delete(promo);
  }

  @PostMapping(value = "/update", consumes = "application/json", produces = "application/json")
  public void updatePromo(@RequestBody Promotion promo) {
    promoService.update(promo);
  }
}
