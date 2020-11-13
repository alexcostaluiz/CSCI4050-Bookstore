package com.csci4050.bookstore;

import static org.assertj.core.api.Assertions.assertThat;

import com.csci4050.bookstore.model.Book;
import com.csci4050.bookstore.model.Category;
import com.csci4050.bookstore.service.BookService;
import java.time.LocalDateTime;
import java.util.Arrays;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@TestInstance(Lifecycle.PER_CLASS)
class BookTest {

  @Autowired private BookService bookService;

  private Book bookOne =
      new Book(
          111,
          LocalDateTime.of(2011, 1, 1, 1, 1, 1),
          15,
          5,
          2.50,
          4.12,
          "Book time",
          "nope",
          "5th",
          "UGA Publishing",
          Arrays.asList(Category.Action),
          Arrays.asList("Lennon Scariano"),
          Arrays.asList("Best seller"));

  private Book bookTwo =
      new Book(
          142,
          LocalDateTime.of(2013, 1, 1, 1, 1, 1),
          25,
          50,
          2.50,
          4.12,
          "Book ayy",
          "yes",
          "5th",
          "UGA not publishing",
          Arrays.asList(Category.Action),
          Arrays.asList("Lennon Scariano"),
          Arrays.asList("featured"));

  @LocalServerPort private int port;

  @Autowired private TestRestTemplate restTemplate;

  @BeforeAll
  public void init() throws Exception {
    // temporarily create books in database
    bookService.save(bookOne);
    bookService.save(bookTwo);
  }

  @Test
  public void testOr() throws Exception {
    assertThat(
            restTemplate.getForObject(
                "http://localhost:"
                    + port
                    + "/books/get?filter=publisher == \"UGA Publishing\" , publisher == \"UGA not"
                    + " publishing\"",
                Book[].class))
        .containsExactlyInAnyOrder(bookOne, bookTwo);
  }

  @Test
  public void testAnd() throws Exception {
    assertThat(
            restTemplate.getForObject(
                "http://localhost:"
                    + port
                    + "/books/get?filter=publisher == \"UGA Publishing\" ; title == \"Book time\"",
                Book[].class))
        .containsExactly(bookOne);
  }

  @Test
  public void testNested() throws Exception {
    assertThat(
            restTemplate.getForObject(
                "http://localhost:"
                    + port
                    + "/books/get?filter=publisher == \"UGA Publishing\" ; title == \"Book time\""
                    + " , publisher == \"UGA not publishing\"",
                Book[].class))
        .containsExactlyInAnyOrder(bookOne, bookTwo);
  }

  @Test
  public void testGTE() throws Exception {
    assertThat(
            restTemplate.getForObject(
                "http://localhost:" + port + "/books/get?filter=id >= 0", Book[].class))
        .containsExactly(bookOne, bookTwo);
  }

  @Test
  public void testGT() throws Exception {
    assertThat(
            restTemplate.getForObject(
                "http://localhost:" + port + "/books/get?filter=isbn > 111", Book[].class))
        .containsExactly(bookTwo);
  }

  @Test
  public void testLT() throws Exception {
    assertThat(
            restTemplate.getForObject(
                "http://localhost:" + port + "/books/get?filter=isbn < 140", Book[].class))
        .containsExactly(bookOne);
  }

  @Test
  public void testLTE() throws Exception {
    assertThat(
            restTemplate.getForObject(
                "http://localhost:" + port + "/books/get?filter=isbn <= 142", Book[].class))
        .containsExactly(bookOne, bookTwo);
  }

  @Test
  public void testEqual() throws Exception {
    assertThat(
            restTemplate.getForObject(
                "http://localhost:" + port + "/books/get?filter=isbn == 142", Book[].class))
        .containsExactly(bookTwo);
  }

  @Test
  public void testNotEqual() throws Exception {
    assertThat(
            restTemplate.getForObject(
                "http://localhost:" + port + "/books/get?filter=isbn != 142", Book[].class))
        .containsExactly(bookOne);
  }

  @AfterAll
  public void exit() throws Exception {
    bookService.delete(bookOne.getId());
    bookService.delete(bookTwo.getId());
  }
}