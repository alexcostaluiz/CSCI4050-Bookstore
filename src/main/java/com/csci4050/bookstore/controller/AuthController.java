package com.csci4050.bookstore.controller;

import com.csci4050.bookstore.events.PasswordResetEvent;
import com.csci4050.bookstore.events.RegistrationCompletionEvent;
import com.csci4050.bookstore.model.Address;
import com.csci4050.bookstore.model.Card;
import com.csci4050.bookstore.model.User;
import com.csci4050.bookstore.service.AddressService;
import com.csci4050.bookstore.service.CardService;
import com.csci4050.bookstore.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
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

  @Resource(name = "authenticationManager")
  AuthenticationManager authManager;

  @Autowired private UserService userService;
  @Autowired private CardService cardService;
  @Autowired private AddressService addressService;
  @Autowired private ApplicationEventPublisher eventPublisher;
  @Autowired ObjectMapper objectMapper = new ObjectMapper();
  /* These all will interface with service files */

  @PostMapping("/saveAddress")
  public void saveAddress(@RequestBody String json) {
    try {
      Address address = objectMapper.readValue(json, Address.class);
      Authentication auth = SecurityContextHolder.getContext().getAuthentication();
      if (auth != null) {
        Object principal = auth.getPrincipal();
        if (principal instanceof UserDetails) {
          UserDetails user = (UserDetails) principal;
          User userObj = userService.getUser(user.getUsername());
          List<Address> addresses = userObj.getAddresses();
          addresses.add(address);
          userObj.setAddresses(addresses);
          userService.updateUser(userObj);
        } else {
          throw new Exception("Authentication failed");
        }
      } else {
        throw new Exception("Authentication failed");      
      }
    } catch (JsonProcessingException e) {
      e.printStackTrace();
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Error deserializing Address", e);
    } catch (Exception e) {
      e.printStackTrace();
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, e.getMessage(), e);
    }
  }

  @PostMapping("/deleteAddress")
  public void deleteAddress(@RequestBody String json) {
    try {
      Address address = objectMapper.readValue(json, Address.class);
      Authentication auth = SecurityContextHolder.getContext().getAuthentication();
      if (auth != null) { // if authentication is valid
        Object principal = auth.getPrincipal();
        if (principal instanceof UserDetails) {
          addressService.delete(address.getId());
        } else {
          throw new Exception("Authentication failed");
        }
      } else {
        throw new Exception("Authentication failed");
      }
    } catch (JsonProcessingException e) {
      e.printStackTrace();
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Error deserializing Address", e);
    } catch (Exception e) {
      e.printStackTrace();
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, e.getMessage(), e);
    }
  }

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
        } else {
          throw new Exception("Authentication failed");
        }
      } else {
        throw new Exception("Authentication failed");
      }
    } catch (JsonProcessingException e) {
      e.printStackTrace();
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Error deserializing Card", e);
    } catch (Exception e) {
      e.printStackTrace();
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, e.getMessage(), e);
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
        } else {
          throw new Exception("Authentication failed");
        }
      } else {
        throw new Exception("Authentication failed");
      }
    } catch (JsonProcessingException e) {
      e.printStackTrace();
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Error deserializing Card", e);
    } catch (Exception e) {
      e.printStackTrace();
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, e.getMessage(), e);
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
        } else {
          throw new Exception("Authentication failed");
        }
      } else {
        throw new Exception("Authentication failed");
      }
    } catch (JsonProcessingException e) {
      e.printStackTrace();
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Error deserializing user", e);
    } catch (Exception e) {
      e.printStackTrace();
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, e.getMessage(), e);
    } 
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
          // check old password
          if (bcrypt.matches(dto.getOldPassword(), user.getPassword())) {
            // change pw
            User userObj = userService.getUser(user.getUsername());
            String newPass = bcrypt.encode(dto.getNewPassword());
            userObj.setPassword(newPass);
            userService.updateUser(userObj);

            // reauths user after successful pw change
            UsernamePasswordAuthenticationToken token =
                new UsernamePasswordAuthenticationToken(user.getUsername(), dto.getNewPassword());
            auth = authManager.authenticate(token);
            SecurityContextHolder.getContext().setAuthentication(auth);
          } else {
            throw new Exception("incorrect password");
          }
        }
      }
    } catch (JsonProcessingException e) {
      // problems deserializing
      e.printStackTrace();
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Error deserializing Password", e);
    } catch (Exception e) {
      e.printStackTrace();
      throw new ResponseStatusException(HttpStatus.CONFLICT, e.getMessage(), e);
    }
  }

  @PostMapping("/forgot_password")
  public void forgotPassword(@RequestBody String json, HttpServletRequest request) {
    try {
      User user = objectMapper.readValue(json, User.class);
      user = userService.getUser(user.getEmailAddress()); // find user based on email
      if (user.getId() != null) { // if the user has been found
        String url = request.getContextPath();
        eventPublisher.publishEvent(new PasswordResetEvent(user, request.getLocale(), url)); // reset password
      } else { // if the user isn't found
        throw new Exception("User not found");
      }
    } catch (JsonProcessingException e) {
      e.printStackTrace();
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Error deserializing User", e);
    } catch (Exception e) {
      e.printStackTrace();
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
    }
  }

  @GetMapping("/user")
  public User getUser() throws Exception {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    if (auth != null) { // if the user exists
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
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Error deserializing User Object", e);
    } catch (DataIntegrityViolationException e) {
      e.printStackTrace();
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists", e);
    }
  }
}
