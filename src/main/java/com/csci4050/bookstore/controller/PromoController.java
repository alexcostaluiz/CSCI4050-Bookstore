package com.csci4050.bookstore.controller;

import com.csci4050.bookstore.exceptions.FilterException;
import com.csci4050.bookstore.model.Promotion;
import com.csci4050.bookstore.service.PromoService;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/promos")
public class PromoController {
  @Autowired private PromoService promoService;

  @GetMapping("/get/{id}")
  public Promotion getBook(@PathVariable int id) {
    return promoService.get(id);
  }

  @GetMapping("/get")
  public List<Promotion> getBooks(@RequestParam Map<String, String> filters) {
    try {
      return promoService.get(filters);
    } catch (NoSuchFieldException e) {
      throw new FilterException();
    } catch (IllegalArgumentException e) {
      throw new FilterException();
    }
  }
}