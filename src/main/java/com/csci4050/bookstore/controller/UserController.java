package com.csci4050.bookstore.controller;

import com.csci4050.bookstore.model.Role;
import com.csci4050.bookstore.model.User;
import com.csci4050.bookstore.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/users")
public class UserController {
  @Autowired private UserService userService;
  @Autowired private Role role;
  @Autowired ObjectMapper objectMapper = new ObjectMapper();

  @GetMapping("/get/{id}")
  public User getUser(@PathVariable int id) {
    return userService.get(id);
  }

  @GetMapping("/get")
  public List<User> getUsers() {
    return userService.get();
  }

  /**
   * Promote employee user
   *
   * @param json
   */
  @PostMapping(value = "/promote", consumes = "application/json", produces = "application/json")
  public void promoteUser(@RequestBody String json) {
    try {
      User user = objectMapper.readValue(json, User.class);
      user = userService.getUser(user.getEmailAddress());
      // check to see if the user is an employee
      List<Role> roles = user.getRoles();
      if (roles.contains(Role.EMPLOYEE)) {
        // user is an employee then promote - change role to admin
        roles.add(Role.ADMIN);
        user.setRoles(roles);
      } else {
        // if user is not an employee throw an exception
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User is not an Employee.");
      }
    } catch (JsonProcessingException e) {
      e.printStackTrace();
    } catch (RuntimeException e) {
      e.printStackTrace();
    }
  }

  /**
   * Demote employee user
   *
   * @param json
   */
  @PostMapping(value = "/demote", consumes = "application/json", produces = "application/json")
  public void demoteUser(@RequestBody String json) {
    try {
      User user = objectMapper.readValue(json, User.class);
      user = userService.getUser(user.getEmailAddress());
      // check to see if the user is an ADMIN - check their role
      List<Role> roles = user.getRoles();
      if (roles.contains(Role.ADMIN)) {
        // if they are an Admin then demote
        // demote = change role to employee
        roles.remove(Role.ADMIN);
        user.setRoles(roles);
      } else {
        // if not ADMIN throw an exception - User is not an Admin
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User is not an Admin.");
      }
    } catch (JsonProcessingException e) {
      e.printStackTrace();
    } catch (RuntimeException e) {
      e.printStackTrace();
    }
  }

  /**
   * Suspend user
   *
   * @param user
   */
  @PostMapping(value = "/suspend", consumes = "application/json", produces = "application/json")
  public void suspendUser(@RequestBody User user) {}

  /**
   * De-suspend user
   *
   * @param user
   */
  @PostMapping(value = "/desuspend", consumes = "application/json", produces = "application/json")
  public void deSuspendUser(@RequestBody User user) {}
}
