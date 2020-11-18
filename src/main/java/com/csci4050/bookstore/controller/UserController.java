package com.csci4050.bookstore.controller;

import com.csci4050.bookstore.model.ActivityStatus;
import com.csci4050.bookstore.model.User;
import com.csci4050.bookstore.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {
  @Autowired private UserService userService;

  @Autowired
  ObjectMapper objectMapper = new ObjectMapper(); // ask lennon if this should be instantiated

  @GetMapping("/get/{id}")
  public User getUser(@PathVariable int id) {
    return userService.get(id);
  }

  @GetMapping("/get")
  public List<User> getUsers() {
    return userService.get();
  }

  /**
   * Suspend user
   *
   * @param user
   */
  @PostMapping(value = "/suspend", consumes = "application/json", produces = "application/json")
  public void suspendUser(@RequestBody String json) {
    // maybe need to verify that the user trying to access this endpoint is admin?
    try {
      User user = objectMapper.readValue(json, User.class);
      user = userService.getUser(user.getEmailAddress());
      if (user.getId()
          != null) { // check to make sure user exists, although it shouldn't be reflected in a list
        // of users if they don't
        if (user.getStatus() == ActivityStatus.Suspended) { // if the user is already suspended
          throw new Exception("The user is already suspended.");
        } else if (user.getStatus()
            == ActivityStatus.Inactive) { // if the user has not activated their account
          throw new Exception("The user has not yet activated their account");
        } else { // if the user is active
          user.setStatus(ActivityStatus.Suspended); // suspend them
          userService.updateUser(user); // update the status in the db
        }
      } else {
        throw new Exception("The indicated user does not exist.");
      }
    } catch (JsonProcessingException e) {
      e.printStackTrace();
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  /**
   * De-suspend user
   *
   * @param user
   */
  @PostMapping(value = "/unsuspend", consumes = "application/json", produces = "application/json")
  public void unSuspendUser(@RequestBody String json) {
    try {
      User user = objectMapper.readValue(json, User.class);
      user = userService.getUser(user.getEmailAddress());
      if (user.getId()
          != null) { // check to make sure user exists, although it shouldn't be reflected in a list
        // of users if they don't
        if (user.getStatus() == ActivityStatus.Active) { // if the user is already suspended
          throw new Exception("The user is not currently suspended.");
        } else if (user.getStatus()
            == ActivityStatus.Inactive) { // if the user has not activated their account
          throw new Exception("The user has not yet activated their account");
        } else { // if the user is suspended
          user.setStatus(ActivityStatus.Active); // suspend them
          userService.updateUser(user); // update the status in the db
        }
      } else {
        throw new Exception("The indicated user does not exist.");
      }
    } catch (JsonProcessingException e) {
      e.printStackTrace();
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
