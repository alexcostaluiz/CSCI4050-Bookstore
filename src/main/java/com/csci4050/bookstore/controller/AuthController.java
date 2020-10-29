package com.csci4050.bookstore.controller;

import com.csci4050.bookstore.model.RegisteredUser;
import com.csci4050.bookstore.service.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

  @Autowired private RegisterService registerService;
  /* These all will interface with service files */

  @GetMapping("/user")
  public String user() {
    return ("<h1>Welcome User</h1>");
  }

  @GetMapping("/admin")
  public String admin() {
    return ("<h1>Welcome Admin</h1>");
  }

  @GetMapping("/")
  public String slash() {
    return ("<h1>Welcome Anyone</h1>");
  }

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
  /*
  @GetMapping("/user")
  public User getLoggedInUser() {
    return new User();
  }
  */
  @PostMapping("/register")
  public void register(@RequestBody RegisteredUser user) {
    System.out.println("register");
    registerService.register(user);
  }
}
