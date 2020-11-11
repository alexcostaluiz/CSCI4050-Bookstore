package com.csci4050.bookstore;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDateTime;

import com.csci4050.bookstore.model.Promotion;
import com.csci4050.bookstore.service.PromoService;
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

  private Promotion promoOne =
      new Promotion();

  private Promotion promoTwo =
      new Promotion();
        LocalDateTime start = LocalDateTime.now();
        LocalDateTime end1 = LocalDateTime.now().plusDays(10);
        LocalDateTime end2 = LocalDateTime.now().plusDays(11);
  @LocalServerPort private int port;

  @Autowired private TestRestTemplate restTemplate;

  @BeforeAll
  public void init() throws Exception {
    // temporarily create promos in database
    promoOne.setStartDate(start);
    promoOne.setEndDate(end1);
    promoOne.setPromoCode("Test1");
    promoOne.setDiscount(0.5);

    
    promoTwo.setStartDate(start);
    promoTwo.setEndDate(end2);
    promoTwo.setPromoCode("Test2");
    promoTwo.setDiscount(0.6);

    promoService.save(promoOne);
    promoService.save(promoTwo);
  }

  @Test
  public void testOr() throws Exception {

    assertThat(
            restTemplate.getForObject(
                "http://localhost:"
                    + port
                    + "/promos/get?filter=endDate == \"" + end1.toString().replaceAll("T", " ") + "\" , endDate == \"" + end2.toString().replaceAll("T", " ") + "\"",
                Promotion[].class))
        .containsExactlyInAnyOrder(promoOne, promoTwo);
  }

  @Test
  public void testAnd() throws Exception {
    assertThat(
            restTemplate.getForObject(
                "http://localhost:"
                    + port
                    + "/promos/get?filter=startDate == \"" + start.toString().replaceAll("T", " ") + "\" ; endDate == \"" + end1.toString().replaceAll("T", " ") + "\"",
                    Promotion[].class))
        .containsExactly(promoOne);
  }
  
  @Test
  public void testNested() throws Exception {
    assertThat(
            restTemplate.getForObject(
                "http://localhost:"
                    + port
                    + "/promos/get?filter=publisher == \"UGA Publishing\" ; title == \"Book time\""
                    + " , publisher == \"UGA not publishing\"",
                    Promotion[].class))
        .containsExactlyInAnyOrder(promoOne, promoTwo);
  }

  @Test
  public void testGTE() throws Exception {
    assertThat(
            restTemplate.getForObject(
                "http://localhost:" + port + "/promos/get?filter=id >= 0", Promotion[].class))
        .containsExactly(promoOne, promoTwo);
  }

  @Test
  public void testGT() throws Exception {
    assertThat(
            restTemplate.getForObject(
                "http://localhost:" + port + "/promos/get?filter=isbn > 111", Promotion[].class))
        .containsExactly(promoTwo);
  }

  @Test
  public void testLT() throws Exception {
    assertThat(
            restTemplate.getForObject(
                "http://localhost:" + port + "/promos/get?filter=isbn < 140", Promotion[].class))
        .containsExactly(promoOne);
  }

  @Test
  public void testLTE() throws Exception {
    assertThat(
            restTemplate.getForObject(
                "http://localhost:" + port + "/promos/get?filter=isbn <= 142", Promotion[].class))
        .containsExactly(promoOne, promoTwo);
  }

  @Test
  public void testEqual() throws Exception {
    assertThat(
            restTemplate.getForObject(
                "http://localhost:" + port + "/promos/get?filter=isbn == 142", Promotion[].class))
        .containsExactly(promoTwo);
  }

  @Test
  public void testNotEqual() throws Exception {
    assertThat(
            restTemplate.getForObject(
                "http://localhost:" + port + "/promos/get?filter=isbn != 142", Promotion[].class))
        .containsExactly(promoOne);
  }
  
  @AfterAll
  public void exit() throws Exception {
    promoService.delete(promoOne);
    promoService.delete(promoTwo);
  }
  
}
