package com.csci4050.bookstore.controller;

import com.csci4050.bookstore.events.ExpireUserEvent;
import com.csci4050.bookstore.model.ActivityStatus;
import com.csci4050.bookstore.model.Role;
import com.csci4050.bookstore.model.User;
import com.csci4050.bookstore.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
  @Autowired private ApplicationEventPublisher eventPublisher;

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
    BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
    if (user.getPassword() != null) {
      user.setPassword(bcrypt.encode(user.getPassword()));
    } else {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password is empty.");
    }
    userService.updateUser(user);
    eventPublisher.publishEvent(new ExpireUserEvent(user.getEmailAddress()));
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
  public void promoteUser(@RequestBody String email) {
    try {
      User user = userService.getUser(email);
      // check to see if the user is an employee
      List<Role> roles = user.getRoles();
      if (roles.contains(Role.EMPLOYEE)) {
        // user is an employee then promote - change role to admin
        roles.add(Role.ADMIN);
        user.setRoles(roles);
        userService.updateUser(user);

        // reload user sessions
        eventPublisher.publishEvent(new ExpireUserEvent(email));
      } else {
        // if user is not an employee throw an exception
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User is not an Employee.");
      }
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
  public void demoteUser(@RequestBody String email) {
    try {

      User user = userService.getUser(email);

      // check to see if the user is an ADMIN - check their role
      List<Role> roles = user.getRoles();
      if (roles.contains(Role.ADMIN)) {
        // if they are an Admin then demote
        // demote = change role to employee
        roles.remove(Role.ADMIN);
        user.setRoles(roles);
        userService.updateUser(user);

        // reload user sessions
        eventPublisher.publishEvent(new ExpireUserEvent(email));
      } else {
        // if not ADMIN throw an exception - User is not an Admin
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User is not an Admin.");
      }
    } catch (RuntimeException e) {
      e.printStackTrace();
    }
  }

  /**
   * Suspend user
   *
   * @param json
   */
  @PostMapping(value = "/suspend", consumes = "application/json", produces = "application/json")
  public void suspendUser(@RequestBody String email) {
    try {
      User user = userService.getUser(email);
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
          eventPublisher.publishEvent(new ExpireUserEvent(email)); // reload user session
        }
      } else {
        throw new ResponseStatusException(
            HttpStatus.BAD_REQUEST, "The indicated user does not exist.");
      }
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
  public void unSuspendUser(@RequestBody String email) {
    try {
      User user = userService.getUser(email);
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
          eventPublisher.publishEvent(new ExpireUserEvent(email)); // reload user session
        }
      } else {
        throw new ResponseStatusException(
            HttpStatus.BAD_REQUEST, "The indicated user does not exist.");
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
