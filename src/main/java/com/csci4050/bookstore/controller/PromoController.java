package com.csci4050.bookstore.controller;

import com.csci4050.bookstore.exceptions.FilterException;
import com.csci4050.bookstore.model.Promotion;
import com.csci4050.bookstore.service.PromoService;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/promos")
public class PromoController {
  @Autowired private PromoService promoService;

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

  @PostMapping(value = "/create", consumes = "application/json", produces = "application/json")
  public void createPromo(@RequestBody Promotion promo) {
    promoService.save(promo);
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
