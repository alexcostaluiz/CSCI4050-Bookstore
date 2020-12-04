package com.csci4050.bookstore.controller;

import com.csci4050.bookstore.dto.BookDto;
import com.csci4050.bookstore.dto.CartDto;
import com.csci4050.bookstore.dto.CartItemDto;
import com.csci4050.bookstore.dto.OrderDto;
import com.csci4050.bookstore.events.OrderEvent;
import com.csci4050.bookstore.model.Book;
import com.csci4050.bookstore.model.Order;
import com.csci4050.bookstore.model.User;
import com.csci4050.bookstore.service.BookService;
import com.csci4050.bookstore.service.OrderService;
import com.csci4050.bookstore.service.UserService;
import java.util.Map;
import javax.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/cart")
public class CartController {

  @Resource(name = "authenticationManager")
  AuthenticationManager authManager;

  @Autowired private UserService userService;
  @Autowired private OrderService orderService;
  @Autowired private BookService bookService;
  @Autowired private ApplicationEventPublisher eventPublisher;

  /**
   * adds a book to the cart with desired quantity
   *
   * @param dto
   */
  @PostMapping("/add")
  public void add(@RequestBody CartItemDto dto) {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    if (auth != null) {
      Object principal = auth.getPrincipal();
      if (principal instanceof UserDetails) {
        User user = userService.getUser(((UserDetails) principal).getUsername());
        if (dto.getBook() == null) {
          throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Book doesn't exist");
        }
        Book book = bookService.get(dto.getBook().getId());
        Map<Book, Integer> map = user.getCart();
        map.put(book, dto.getQuantity());
        user.setCart(map);
        userService.updateUser(user);
      }
    }
  }

  /**
   * removes book entirely from cart
   *
   * @param dto
   */
  @PostMapping("/remove")
  public void remove(@RequestBody BookDto dto) {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    if (auth != null) {
      Object principal = auth.getPrincipal();
      if (principal instanceof UserDetails) {
        User user = userService.getUser(((UserDetails) principal).getUsername());
        Map<Book, Integer> map = user.getCart();
        Book book = bookService.get(dto.getId());
        if (map.remove(book) == null) { // no mapping found
          throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Book is not in cart.");
        }
        user.setCart(map);
        userService.updateUser(user);
      }
    }
  }

  /**
   * updates quantity of books
   *
   * @param dto
   */
  @PostMapping("/updateQuantity")
  public void updateQuantity(@RequestBody CartItemDto dto) {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    if (auth != null) {
      Object principal = auth.getPrincipal();
      if (principal instanceof UserDetails) {
        User user = userService.getUser(((UserDetails) principal).getUsername());
        Book book = bookService.get(dto.getBook().getId());
        if (user.getCart().containsKey(book)) {
          add(dto); // add method can also act as a replace
        } else {
          throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Book is not in cart.");
        }
      }
    }
  }
  /**
   * Does a full update of the cart.
   *
   * @param cart
   */
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
   * @param dto
   */
  @PostMapping(
      value = "/checkout",
      consumes = {"application/json"})
  public Integer checkout(@RequestBody OrderDto dto) {
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
          user.setCart(
              null); // reset cart to null due to a bug in copying the map over to a new table
          userService.updateUser(user);

          // persist order
          Integer orderId = orderService.save(order);

          // send email
          eventPublisher.publishEvent(new OrderEvent(orderService.get(orderId), user));
          return orderId;
        } else {
          throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cart is empty.");
        }
      }
    }
    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User not logged in.");
  }
}
