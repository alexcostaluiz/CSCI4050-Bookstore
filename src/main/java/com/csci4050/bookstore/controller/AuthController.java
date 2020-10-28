package com.csci4050.bookstore.controller;

import com.csci4050.bookstore.model.RegisteredUser;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;


@RequestMapping("/auth")
public class AuthController {

  @Autowired private RegisterService registerService;
  /* These all will interface with service files */

  @PostMapping("/login")
  public void login() {
    System.out.println("login");
  }

  @PostMapping("/logout")
  public void logout() {
    System.out.println("logout");
  }

  @PostMapping("/edit_profile")
  public void editProfile() {
    System.out.println("edit profile");
  }

  @PostMapping("/forgot_password")
  public void forgotPassword() {
    System.out.println("forgot password");
  }

  @PostMapping("/register")
  public void register(@RequestBody RegisteredUser user) {
    System.out.println("register");
    registerService.register();
  }
}
