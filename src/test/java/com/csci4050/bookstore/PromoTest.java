package com.csci4050.bookstore;

import static org.assertj.core.api.Assertions.assertThat;

import com.csci4050.bookstore.model.Promotion;
import com.csci4050.bookstore.service.PromoService;
import java.time.LocalDateTime;
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
class PromoTest {

  @Autowired private PromoService promoService;

  private Promotion promoOne = new Promotion();

  private Promotion promoTwo = new Promotion();

  // start is set a higher month than end since date strings are compared lexicographically
  // this is to test for incorrect date filtering
  LocalDateTime start = LocalDateTime.of(2019, 12, 14, 4, 0, 1);
  LocalDateTime end1 = start.plusDays(60);
  LocalDateTime end2 = start.plusDays(61);
  @LocalServerPort private int port;

  @Autowired private TestRestTemplate restTemplate;

  @BeforeAll
  public void init() throws Exception {
    System.out.println(end1.toString());
    // temporarily create promos in database
    promoOne.setStartDate(start);
    promoOne.setEndDate(end1);
    promoOne.setPromoCode("Test1");
    promoOne.setDiscount(0.5);
    promoOne.setDescription("this is a description");
    promoTwo.setStartDate(start);
    promoTwo.setEndDate(end2);
    promoTwo.setPromoCode("Test2");
    promoTwo.setDiscount(0.6);
    promoTwo.setDescription("this is another description");
    promoService.save(promoOne);
    promoService.save(promoTwo);
    System.out.println(promoOne.getStartDate().toString());
  }

  @Test
  public void findByDate() throws Exception {
    assertThat(
            restTemplate.getForObject(
                "http://localhost:"
                    + port
                    + "/promos/get?filter=startDate == \""
                    + start.toString().replaceAll("T", " ")
                    + "\"",
                Promotion[].class))
        .containsExactlyInAnyOrder(promoOne, promoTwo);
  }

  @Test
  public void testAndGT() throws Exception {
    assertThat(
            restTemplate.getForObject(
                "http://localhost:"
                    + port
                    + "/promos/get?filter=startDate >= \""
                    + start.toString().replaceAll("T", " ")
                    + "\" ; endDate <= \""
                    + end1.toString().replaceAll("T", " ")
                    + "\"",
                Promotion[].class))
        .containsExactly(promoOne);
  }

  @AfterAll
  public void exit() throws Exception {
    promoService.delete(promoOne);
    promoService.delete(promoTwo);
  }
}
