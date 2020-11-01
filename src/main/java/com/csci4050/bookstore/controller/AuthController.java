package com.csci4050.bookstore.controller;

import com.csci4050.bookstore.model.Card;
import com.csci4050.bookstore.model.RegistrationCompletionEvent;
import com.csci4050.bookstore.model.User;
import com.csci4050.bookstore.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@RestController
@RequestMapping("/auth")
public class AuthController {

  @Autowired private UserService userService;
  @Autowired private ApplicationEventPublisher eventPublisher;
  /* These all will interface with service files */

  @PostMapping("/logout")
  public void logout() {
    System.out.println("logout");
  }

  @PostMapping(value = "/edit_profile", consumes = "application/json")
  public void editProfile(@RequestBody String json) {
    ObjectMapper objectMapper = new ObjectMapper();
    try {
      User newUser = objectMapper.readValue(json, User.class);
      User oldUser = userService.getUser(newUser.getEmailAddress());
      //update if the submitted item is not empty or null
      if (!newUser.getFirstName().isEmpty() || !newUser.getFirstName().equalsIgnoreCase(null)) {
        oldUser.setFirstName(newUser.getFirstName());
      }
      if (!newUser.getLastName().isEmpty() || !newUser.getLastName().equalsIgnoreCase(null)) {
        oldUser.setLastName(newUser.getLastName());
      }
      if (!newUser.getEmailAddress().isEmpty() || !newUser.getEmailAddress().equalsIgnoreCase(null)) {
        oldUser.setEmailAddress(newUser.getEmailAddress());
      } 
      if (!newUser.getAddress().toString().isEmpty() || !newUser.getAddress().toString().equalsIgnoreCase(null)) {
        oldUser.setAddress(newUser.getAddress());
      }
      // password
      BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
      if (!newUser.getPassword().isEmpty() || newUser.getPassword().equalsIgnoreCase(null)) {
        oldUser.setPassword(bcrypt.encode(newUser.getPassword()));
      }
      // card

    } catch (JsonProcessingException e) {
      // TODO Auto-generated catch block
      e.printStackTrace();
    }
  }

  @PostMapping("/forgot_password")
  public void forgotPassword() {
    System.out.println("forgot password");
  }

  @GetMapping("/user")
  public User getUser() throws Exception {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    if (auth != null) {
      Object principal = auth.getPrincipal();
      if (principal instanceof UserDetails) {
        UserDetails user = (UserDetails) principal;
        return userService.getUser(user.getUsername());
      }
    }
    throw new Exception();
  }

  @PostMapping(value = "/register", consumes = "application/json")
  public void register(@RequestBody String json, HttpServletRequest request) {
    ObjectMapper objectMapper = new ObjectMapper();
    try {
      User user = objectMapper.readValue(json, User.class);
      // System.out.println(user.getEmailAddress());
      String url = request.getContextPath();
      userService.createUser(user);
      eventPublisher.publishEvent(new RegistrationCompletionEvent(user, request.getLocale(), url));
    } catch (JsonProcessingException e) {
      e.printStackTrace();
    } catch (RuntimeException e) {
      e.printStackTrace();
    }
  }
}
