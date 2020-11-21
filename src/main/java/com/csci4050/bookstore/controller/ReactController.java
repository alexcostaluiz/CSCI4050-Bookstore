package com.csci4050.bookstore.controller;

import com.csci4050.bookstore.model.VerificationToken;
import com.csci4050.bookstore.service.TokenService;
import java.util.Calendar;
import javax.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.server.ResponseStatusException;

@Controller
public class ReactController {

  @Autowired private TokenService tokenService;

  @Resource(name = "authenticationManager")
  private AuthenticationManager authManager;

  @RequestMapping(
      value = {
        "/",
        "/b/{id}",
        "/profile",
        "/orderHistory",
        "/cart",
        "/checkout",
        "/admin/manage/books",
        "/admin",
        "/books",
        "/admin/manage/users",
        "/admin/manage/promotions"
      },
      method = RequestMethod.GET)
  public String mainController() {
    return "/index.html";
  }

  @RequestMapping(
      value = {"/register", "/login", "/forgotPassword"},
      method = RequestMethod.GET)
  public String restrictUsers() throws Exception {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    if (auth != null) {
      Object principal = auth.getPrincipal();
      if (!(principal instanceof UserDetails)) {
        return "/index.html";
      }
    }

    throw new ResponseStatusException(HttpStatus.FORBIDDEN, "User already logged in");
  }

  @RequestMapping(
      value = {"/updatePassword"},
      method = RequestMethod.GET)
  public String updatePassword(@RequestParam("token") String token) throws Exception {

    VerificationToken verificationToken = tokenService.get(token);

    if (verificationToken == null) {
      return "redirect:/login";
    }

    Calendar cal = Calendar.getInstance();
    if ((verificationToken.getExpirationDate().getTime() - cal.getTime().getTime()) <= 0) {
      tokenService.delete(verificationToken.getId());
      return "redirect:/login";
    }
    return "index.html";
  }
}
