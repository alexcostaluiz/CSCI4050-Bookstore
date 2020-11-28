package com.csci4050.bookstore.controller;

import com.csci4050.bookstore.dto.CartDto;
import com.csci4050.bookstore.dto.OrderDto;
import com.csci4050.bookstore.dto.PasswordDto;
import com.csci4050.bookstore.events.OrderEvent;
import com.csci4050.bookstore.model.Address;
import com.csci4050.bookstore.model.Book;
import com.csci4050.bookstore.model.Card;
import com.csci4050.bookstore.model.Order;
import com.csci4050.bookstore.model.User;
import com.csci4050.bookstore.service.AddressService;
import com.csci4050.bookstore.service.CardService;
import com.csci4050.bookstore.service.OrderService;
import com.csci4050.bookstore.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/edit")
public class EditController {

  @Resource(name = "authenticationManager")
  AuthenticationManager authManager;

  @Autowired private UserService userService;
  @Autowired private CardService cardService;
  @Autowired private AddressService addressService;
  @Autowired private OrderService orderService;
  @Autowired ObjectMapper objectMapper = new ObjectMapper();
  @Autowired private ApplicationEventPublisher eventPublisher;
  /* These all will interface with service files */

  @PostMapping(value = "/saveAddress", produces = "application/json")
  public Address saveAddress(@RequestBody String json) {
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
          return address;
        }
      }
    } catch (JsonProcessingException e) {
      e.printStackTrace();
    } catch (RuntimeException e) {
      e.printStackTrace();
    }

    return null;
  }

  @PostMapping("/deleteAddress")
  public void deleteAddress(@RequestBody String json) {
    try {
      Address address = objectMapper.readValue(json, Address.class);
      Authentication auth = SecurityContextHolder.getContext().getAuthentication();
      if (auth != null) {
        Object principal = auth.getPrincipal();
        if (principal instanceof UserDetails) {
          addressService.delete(address.getId());
        }
      }
    } catch (JsonProcessingException e) {
      e.printStackTrace();
    } catch (RuntimeException e) {
      e.printStackTrace();
    }
  }

  @PostMapping("/saveCard")
  public Card saveCard(@RequestBody String json) {
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
          return card;
        }
      }
    } catch (JsonProcessingException e) {
      e.printStackTrace();
    } catch (RuntimeException e) {
      e.printStackTrace();
    }

    return null;
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

  @PostMapping("/personalInfo")
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

  @PostMapping("/password")
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
    } catch (RuntimeException e) {
      e.printStackTrace();
    }
  }

  @PostMapping("/updateCart")
  public void updateCart(@RequestBody CartDto cart) {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();

    if (auth != null) {
      Object principal = auth.getPrincipal();
      if (principal instanceof UserDetails) {
        User user = userService.getUser(((UserDetails) principal).getUsername());
        user.setCart(cart.getBooks());
        userService.updateUser(user);
      }
    }
  }

  /**
   * Clears the cart and saves the order
   *
   * @throws JsonProcessingException
   * @throws JsonMappingException
   */
  @PostMapping(
      value = "/checkout",
      consumes = {"application/json"})
  public void checkout(@RequestBody OrderDto dto) {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    if (auth != null) {
      Object principal = auth.getPrincipal();
      if (principal instanceof UserDetails) {
        User user = userService.getUser(((UserDetails) principal).getUsername());

        // reset cart, add order to history and send email
        if (user.getCart().size() > 0) {
          Map<Book, Integer> cart = user.getCart();

          // setup order object to be persisted
          Order order = new Order();
          order.setAddress(dto.getAddress());
          order.setOrderCart(cart);
          order.setOrderDate(dto.getOrderDate());
          order.setPayment(dto.getPayment());
          order.setPromo(dto.getPromo());
          order.setUser(user);

          // reset cart
          cart.clear();
          user.setCart(cart);
          userService.updateUser(user);

          // persist order
          int orderId = orderService.save(order);

          // send email
          eventPublisher.publishEvent(new OrderEvent(orderService.get(orderId), user));
        } else {
          throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cart is empty.");
        }
      }
    }
  }
}
