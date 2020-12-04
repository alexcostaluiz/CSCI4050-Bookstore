package com.csci4050.bookstore.controller;

import com.csci4050.bookstore.events.EmailPromoEvent;
import com.csci4050.bookstore.model.Book;
import com.csci4050.bookstore.model.Promotion;
import com.csci4050.bookstore.service.BookService;
import com.csci4050.bookstore.service.PromoService;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/promos")
public class PromoController {
  @Autowired private PromoService promoService;
  @Autowired private BookService bookService;
  @Autowired private ApplicationEventPublisher eventPublisher;

  @GetMapping("/get/{id}")
  public Promotion getPromo(@PathVariable Integer id) {
    return promoService.get(id);
  }

  @GetMapping("/getCode/{code}")
  public Promotion getPromo(@PathVariable String code) {
    Promotion promo = promoService.get(code);
    System.out.println(LocalDateTime.now().isBefore(promo.getEndDate()));
    if(promo != null && LocalDateTime.now().isBefore(promo.getEndDate()) && promo.isEmailed()) {
      return promo;
    } else {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Promotion code doesn't exist.");
    }


  }

  @GetMapping("/get")
  public List<Promotion> getPromos() {
    return promoService.get();
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
      if (books != null) {
        for (int i = 0; i < books.size(); i++) {
          Book book = bookService.get(books.get(i).getId());
          book.setPromo(promo);
        }
        promo.setBooks(books);
      }

      promoService.save(promo);
    } catch (NullPointerException e) {
      throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "Book id not found", e);
    }
  }

  @DeleteMapping(value = "/delete", consumes = "application/json", produces = "application/json")
  public void deletePromo(@RequestBody Promotion promo) {
    promo = promoService.get(promo.getId());
    if (promo == null) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Promotion doesn't exist");
    }
    if (!promo.isEmailed()) {
      // delete promo from books
      List<Book> books = promo.getBooks();
      if (books != null) {
        for (Book book : books) {
          book.setPromo(null);
          bookService.update(book);
        }
      }

      promoService.delete(promo);
    } else {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Promotion already emailed");
    }
  }

  @PostMapping(value = "/update", consumes = "application/json", produces = "application/json")
  public void updatePromo(@RequestBody Promotion promo) {
    Promotion oldPromo = promoService.get(promo.getId());
    if (oldPromo == null) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Promotion doesn't exist");
    }
    if (!oldPromo.isEmailed()) {
      // reset old books to null
      List<Book> oldBooks = oldPromo.getBooks();
      if (oldBooks != null) {
        for (Book book : oldBooks) {
          book.setPromo(null);
          bookService.update(book);
        }
      }

      // update with new list of books (if any were taken away or added)
      List<Book> books = promo.getBooks();
      if (books != null) {
        for (int i = 0; i < books.size(); i++) {
          Book book = bookService.get(books.get(i).getId());
          try {
            book.setPromo(promo);
          } catch (NullPointerException e) {
          }
        }
      }

      promo.setBooks(books);
      promoService.update(promo);
    } else {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Promotion already emailed");
    }
  }

  @PostMapping(value = "/email", consumes = "application/json", produces = "application/json")
  public void emailPromo(@RequestBody Promotion promo) {
    promo = promoService.get(promo.getId());

    if (promo == null) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Promotion doesn't exist");
    }
    eventPublisher.publishEvent(new EmailPromoEvent(promo));
  }
}
