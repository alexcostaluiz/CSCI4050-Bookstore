package com.csci4050.bookstore.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class ReactController {

  @RequestMapping(
      value = {
        "/",
        "/b/{id}",
        "/profile",
        "/cart",
        "/checkout",
        "/admin/manage/books",
        "/admin",
        "/books"
      },
      method = RequestMethod.GET)
  public String mainController() {
    return "/index.html";
  }

  @RequestMapping(
      value = {"/register", "/login"},
      method = RequestMethod.GET)
  public String restrictUsers() throws Exception {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    if (auth != null) {
      Object principal = auth.getPrincipal();
      if (!(principal instanceof UserDetails)) {
        return "/index.html";
      }
    }

    throw new Exception("User already logged in");
  }
}
