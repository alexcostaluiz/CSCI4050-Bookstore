package com.csci4050.bookstore.controller;

import com.csci4050.bookstore.dto.BookDto;
import com.csci4050.bookstore.exceptions.FilterException;
import com.csci4050.bookstore.model.Author;
import com.csci4050.bookstore.model.AuthorBookAssociation;
import com.csci4050.bookstore.model.Book;
import com.csci4050.bookstore.model.Category;
import com.csci4050.bookstore.model.Tag;
import com.csci4050.bookstore.service.AuthorService;
import com.csci4050.bookstore.service.BookService;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
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
  @Autowired private AuthorService authorService;

  @GetMapping("/get/{id}")
  public BookDto getBook(@PathVariable int id) {
    return Book.bookToDto(bookService.get(id));
  }

  @GetMapping("/get")
  public List<BookDto> getBooks(@RequestParam Map<String, String> filters) {
    try {
      List<Book> books = bookService.get(filters);
      List<BookDto> dtos = new ArrayList<BookDto>();
      for (Book book : books) {
        dtos.add(Book.bookToDto(book));
      }
      return dtos;
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

  @GetMapping("/get/tags")
  public List<Tag> getTags() {
    return Arrays.asList(Tag.values());
  }

  @PostMapping(value = "/create", consumes = "application/json", produces = "application/json")
  public void createBook(@RequestBody BookDto bookDto) {
    try {
      Book book = Book.dtoToBook(bookDto);

      for (AuthorBookAssociation assoc : book.getAuthors()) {

        Author author = assoc.getAuthor();
        if (author.getId() == null || authorService.get(author.getId()) == null) { // create author
          authorService.save(author);
        }
      }
      bookService.save(book);
    } catch (DataIntegrityViolationException e) {
      e.printStackTrace();
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Book isbn already exists.");
    } catch (NullPointerException e) {
      e.printStackTrace();
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Authors must be non-null");
    }
  }

  @PostMapping(value = "/update", consumes = "application/json", produces = "application/json")
  public void updateBook(@RequestBody BookDto dto) {
    try {
      bookService.delete(dto.getId());
      createBook(dto);
    } catch (DataIntegrityViolationException e) {
      e.printStackTrace();
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Book isbn already exists.");
    } catch (NullPointerException e) {
      e.printStackTrace();
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Authors must be non-null");
    }
  }

  @PostMapping(value = "/archive", consumes = "application/json", produces = "application/json")
  public void archiveBook(@RequestBody BookDto dto) {
    Book book = bookService.get(dto.getId());
    book.setArchived(true);
    bookService.update(book);
  }

  @PostMapping(value = "/unarchive", consumes = "application/json", produces = "application/json")
  public void unarchiveBook(@RequestBody BookDto dto) {
    Book book = bookService.get(dto.getId());
    book.setArchived(false);
    bookService.update(book);
  }
}
