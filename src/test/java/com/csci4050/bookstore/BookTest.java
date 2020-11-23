package com.csci4050.bookstore;

import static org.assertj.core.api.Assertions.assertThat;

import com.csci4050.bookstore.model.Book;
import com.csci4050.bookstore.model.Category;
import com.csci4050.bookstore.model.Tag;
import com.csci4050.bookstore.service.BookService;
import java.time.LocalDate;
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

  private Book bookOne = new Book();
  private Book bookTwo = new Book();

  @LocalServerPort private int port;

  @Autowired private TestRestTemplate restTemplate;

  @BeforeAll
  public void init() throws Exception {

        bookOne.setIsbn("111");
        bookOne.setPubDate(LocalDate.of(2011, 1, 1));
        bookOne.setStock(15);
        bookOne.setMinThresh(5);
        bookOne.setBuyPrice(2.50);
        bookOne.setSellPrice(4.12);
        bookOne.setTitle("Book time");
        bookOne.setCoverPic("nope".getBytes());
        bookOne.setDescription("description");
        bookOne.setPages(514);
        bookOne.setEdition("5th");
        bookOne.setPublisher("UGA Publishing");
        bookOne.setCategories(Arrays.asList(Category.Action));
        bookOne.setTags(Arrays.asList(Tag.BESTSELLER));
        bookOne.setAuthors(null);      

        bookTwo.setIsbn("142");
        bookTwo.setPubDate(LocalDate.of(2013, 1, 1));
        bookTwo.setStock(25);
        bookTwo.setMinThresh(50);
        bookTwo.setBuyPrice(2.50);
        bookTwo.setSellPrice(4.12);
        bookTwo.setTitle("Book ayy");
        bookTwo.setCoverPic("yes".getBytes());
        bookTwo.setDescription("another description");
        bookTwo.setPages(412);
        bookTwo.setEdition("5th");
        bookTwo.setPublisher("UGA not publishing");
        bookTwo.setCategories(Arrays.asList(Category.Action));
        bookTwo.setTags(Arrays.asList(Tag.FEATURED));
        bookTwo.setAuthors(null);      
        
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
