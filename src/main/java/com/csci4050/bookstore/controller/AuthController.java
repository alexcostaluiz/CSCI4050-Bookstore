package com.csci4050.bookstore.controller;

import com.csci4050.bookstore.events.PasswordResetEvent;
import com.csci4050.bookstore.events.RegistrationCompletionEvent;
import com.csci4050.bookstore.model.Address;
import com.csci4050.bookstore.model.Card;
import com.csci4050.bookstore.model.User;
import com.csci4050.bookstore.service.CardService;
import com.csci4050.bookstore.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/auth")
public class AuthController {

  @Autowired private UserService userService;
  @Autowired private CardService cardService;
  @Autowired private ApplicationEventPublisher eventPublisher;
  @Autowired ObjectMapper objectMapper = new ObjectMapper();
  /* These all will interface with service files */

  @PostMapping("/saveCard")
  public void saveCard(@RequestBody String json) {
    try {
      Card card = objectMapper.readValue(json, Card.class);
      Authentication auth = SecurityContextHolder.getContext().getAuthentication();
      if (auth != null) {
        Object principal = auth.getPrincipal();
        if (principal instanceof UserDetails) {
          UserDetails user = (UserDetails) principal;
          User userObj = userService.getUser(user.getUsername());
          List<Card> cards = userObj.getSavedCards();
          cards.add(card);
          userObj.setSavedCards(cards);
          userService.updateUser(userObj);
        }
      }

    } catch (JsonProcessingException e) {
      e.printStackTrace();
    } catch (RuntimeException e) {
      e.printStackTrace();
    }
  }

  @PostMapping("/deleteCard")
  public void deleteCard(@RequestBody String json) {
    try {
      Card card = objectMapper.readValue(json, Card.class);
      Authentication auth = SecurityContextHolder.getContext().getAuthentication();
      if (auth != null) {
        Object principal = auth.getPrincipal();
        if (principal instanceof UserDetails) {
          cardService.delete(card.getId());
        }
      }

    } catch (JsonProcessingException e) {
      e.printStackTrace();
    } catch (RuntimeException e) {
      e.printStackTrace();
    }
  }

  @PostMapping("/edit_profile")
  public void updateUser(@RequestBody String json) {
    try {
      User user = objectMapper.readValue(json, User.class);
      Authentication auth = SecurityContextHolder.getContext().getAuthentication();

      if (auth != null) {
        Object principal = auth.getPrincipal();
        if (principal instanceof UserDetails) {
          User userObj = userService.getUser(((UserDetails) principal).getUsername());

          userObj.setFirstName(user.getFirstName());
          userObj.setLastName(user.getLastName());
          userObj.setPhoneNumber(user.getPhoneNumber());
          userService.updateUser(userObj);
        }
      }

    } catch (JsonProcessingException e) {
      e.printStackTrace();
    } catch (RuntimeException e) {
      e.printStackTrace();
    }
  }

  @PostMapping("/updateAddress")
  public void updateAddress(@RequestBody String json) throws Exception {
    Address address = objectMapper.readValue(json, Address.class);
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();

    if (auth != null) {
      Object principal = auth.getPrincipal();
      if (principal instanceof UserDetails) {
        User userObj = userService.getUser(((UserDetails) principal).getUsername());
        userObj.setAddress(address);
        userService.updateUser(userObj);
      }
    }
    throw new Exception("Not logged in");
  }

  @PostMapping("/changePassword")
  public void changePassword(@RequestBody String json) throws Exception {
    try {
      PasswordDto dto = objectMapper.readValue(json, PasswordDto.class);
      BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
      Authentication auth = SecurityContextHolder.getContext().getAuthentication();
      if (auth != null) {
        Object principal = auth.getPrincipal();
        if (principal instanceof UserDetails) {
          UserDetails user = (UserDetails) principal;

          if (bcrypt.matches(dto.getOldPassword(), user.getPassword())) {
            User userObj = userService.getUser(user.getUsername());

            userObj.setPassword(bcrypt.encode(dto.getNewPassword()));
            userService.updateUser(userObj);
          } else {
            throw new Exception("incorrect password");
          }
        }
      }
    } catch (JsonProcessingException e) {
      e.printStackTrace();
    } catch (RuntimeException e) {
      e.printStackTrace();
    }
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
    }  catch(DataIntegrityViolationException e) {
      e.printStackTrace();
      throw new ResponseStatusException(
           HttpStatus.CONFLICT, "Email already exists", e);
    } catch (RuntimeException e) {
      e.printStackTrace();
    }
  }
}
