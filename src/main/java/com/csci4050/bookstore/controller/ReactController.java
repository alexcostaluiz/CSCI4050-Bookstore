package com.csci4050.bookstore.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class ReactController {

  @RequestMapping(
      value = {
        "/",
        "/register",
        "/b/{id}",
        "/profile",
        "/cart",
        "/checkout",
        "/admin/manage/books",
        "/admin",
        "/books",
        "/login"
      },
      method = RequestMethod.GET)
  public String controller() {
    return "/index.html";
  }
}
