package com.csci4050.bookstore.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/auth")
public class AuthController {

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
  public void register() {
    System.out.println("register");
  }
}
