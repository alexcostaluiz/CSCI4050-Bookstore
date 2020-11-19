package com.csci4050.bookstore.controller;

import com.csci4050.bookstore.model.ActivityStatus;
import com.csci4050.bookstore.model.Role;
import com.csci4050.bookstore.model.User;
import com.csci4050.bookstore.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
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
  @Autowired ObjectMapper objectMapper = new ObjectMapper();

  @GetMapping("/get/{id}")
  public User getUser(@PathVariable int id) {
    return userService.get(id);
  }

  @GetMapping("/get")
  public List<User> getUsers() {
    return userService.get();
  }

  @PostMapping(value = "/update", consumes = "application/json", produces = "application/json")
  public void updateUser(@RequestBody User user) {
    userService.updateUser(user);
  }

  @DeleteMapping(value = "/delete", consumes = "application/json", produces = "application/json")
  public void deleteUser(@RequestBody User user) {
    userService.delete(user);
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
        userService.updateUser(user);
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
        userService.updateUser(user);
      } else {
        // if not ADMIN throw an exception - User is not an Admin
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User is not an Admin.");
      }
    } catch (JsonProcessingException e) {
      e.printStackTrace();
    } catch (RuntimeException e) {

    }
  }

  /**
   * Suspend user
   *
   * @param json
   */
  @PostMapping(value = "/suspend", consumes = "application/json", produces = "application/json")
  public void suspendUser(@RequestBody String json) {
    try {
      User user = objectMapper.readValue(json, User.class);
      user = userService.getUser(user.getEmailAddress());
      if (user.getId()
          != null) { // check to make sure user exists, although it shouldn't be reflected in a list
        if (user.getStatus() == ActivityStatus.Suspended) { // if the user is already suspended
          throw new ResponseStatusException(
              HttpStatus.BAD_REQUEST, "The user is already suspended.");
        } else if (user.getStatus()
            == ActivityStatus.Inactive) { // if the user has not activated their account
          throw new ResponseStatusException(
              HttpStatus.BAD_REQUEST, "The user has not yet activated their account");
        } else { // if the user is active
          user.setStatus(ActivityStatus.Suspended); // suspend them
          userService.updateUser(user); // update the status in the db
        }
      } else {
        throw new ResponseStatusException(
            HttpStatus.BAD_REQUEST, "The indicated user does not exist.");
      }
    } catch (JsonProcessingException e) {
      e.printStackTrace();
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  /**
   * UN-Suspend user
   *
   * @param json
   */
  @PostMapping(value = "/unsuspend", consumes = "application/json", produces = "application/json")
  public void unSuspendUser(@RequestBody String json) {
    try {
      User user = objectMapper.readValue(json, User.class);
      user = userService.getUser(user.getEmailAddress());
      if (user.getId()
          != null) { // check to make sure user exists, although it shouldn't be reflected in a list
        if (user.getStatus() == ActivityStatus.Active) { // if the user is already suspended
          throw new ResponseStatusException(
              HttpStatus.BAD_REQUEST, "The user is not currently suspended.");
        } else if (user.getStatus()
            == ActivityStatus.Inactive) { // if the user has not activated their account
          throw new ResponseStatusException(
              HttpStatus.BAD_REQUEST, "The user has not yet activated their account");
        } else { // if the user is suspended
          user.setStatus(ActivityStatus.Active); // suspend them
          userService.updateUser(user); // update the status in the db
        }
      } else {
        throw new ResponseStatusException(
            HttpStatus.BAD_REQUEST, "The indicated user does not exist.");
      }
    } catch (JsonProcessingException e) {
      e.printStackTrace();
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
