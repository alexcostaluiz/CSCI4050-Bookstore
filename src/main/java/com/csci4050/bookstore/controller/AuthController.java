package com.csci4050.bookstore.controller;

import com.csci4050.bookstore.events.PasswordResetEvent;
import com.csci4050.bookstore.events.RegistrationCompletionEvent;
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

@RestController
@RequestMapping("/auth")
public class AuthController {

  @Autowired private UserService userService;
  @Autowired private ApplicationEventPublisher eventPublisher;
  ObjectMapper objectMapper = new ObjectMapper();
  /* These all will interface with service files */

  @PostMapping("/edit_profile")
  public void editProfile(@RequestBody String json) {
    System.out.println(json);
  }

  @PostMapping("/forgot_password")
  public void forgotPassword(@RequestBody String json, HttpServletRequest request) {

    try {
      User user = objectMapper.readValue(json, User.class);
      user = userService.getUser(user.getEmailAddress());
      if (user.getId() != null) {
        String url = request.getContextPath();
        eventPublisher.publishEvent(new PasswordResetEvent(user, request.getLocale(), url));
      }

    } catch (JsonProcessingException e) {
      e.printStackTrace();
    } catch (RuntimeException e) {
      e.printStackTrace();
    }
  }

  @GetMapping("/user")
  public User getUser() throws Exception {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    if (auth != null) {
      Object principal = auth.getPrincipal();
      if (principal instanceof UserDetails) {
        UserDetails user = (UserDetails) principal;
        User userObj = userService.getUser(user.getUsername());
        System.out.println(userObj.getSavedCards().get(0).getAcctNum());
        return userObj;
      }
    }
    User user = new User();
    return user;
  }

  @PostMapping(value = "/register", consumes = "application/json")
  public void register(@RequestBody String json, HttpServletRequest request) {
    try {
      User user = objectMapper.readValue(json, User.class);
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
