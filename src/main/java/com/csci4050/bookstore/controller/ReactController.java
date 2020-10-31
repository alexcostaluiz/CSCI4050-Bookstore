package com.csci4050.bookstore.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class ReactController {

  @GetMapping("/cart")
  public String cart() {
    return "index.html";
  }

  @GetMapping("/checkout")
  public String checkout() {
    return "index.html";
  }

  @GetMapping("/register")
  public String register() {
    return "index.html";
  }

  @GetMapping("/profile")
  public String profile() {
    return "index.html";
  }

  @GetMapping("/login")
  public String login() {
    return "index.html";
  }

  @RequestMapping(method = RequestMethod.GET, path = "/admin/manage/books")
  public String manage_books() {
    return "index.html";
  }
  /*
  @GetMapping("/admin")
  public String admin() {
      return "index.html";
  }
  */

}
