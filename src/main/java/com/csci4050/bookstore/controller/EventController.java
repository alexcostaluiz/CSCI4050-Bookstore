package com.csci4050.bookstore.controller;

import com.csci4050.bookstore.dto.PasswordDto;
import com.csci4050.bookstore.model.ActivityStatus;
import com.csci4050.bookstore.model.TokenType;
import com.csci4050.bookstore.model.User;
import com.csci4050.bookstore.model.VerificationToken;
import com.csci4050.bookstore.service.TokenService;
import com.csci4050.bookstore.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Calendar;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.server.ResponseStatusException;

@Controller
@RequestMapping("/event")
public class EventController {

  @Autowired private UserService userService;
  @Autowired private TokenService tokenService;
  ObjectMapper objectMapper = new ObjectMapper();

  @GetMapping("/accountConfirm")
  public String confirmAccount(@RequestParam("token") String token) {

    VerificationToken verificationToken = tokenService.get(token);
    Calendar cal = Calendar.getInstance();

    // check validity of token
    if (verificationToken == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Token does not exist.");
    } else if ((verificationToken.getExpirationDate().getTime() - cal.getTime().getTime()) <= 0) {
      tokenService.delete(verificationToken.getId());
      throw new ResponseStatusException(HttpStatus.GONE, "Token expired.");
    } else if (verificationToken.getType() != TokenType.REGISTRATION) {
      throw new ResponseStatusException(HttpStatus.GONE, "Wrong token type.");
    }

    // update status and redirect
    User user = verificationToken.getUser();
    user.setStatus(ActivityStatus.Active);
    userService.updateUser(user);
    tokenService.delete(verificationToken.getId());
    return "redirect:/login";
  }

  @PostMapping("/savePassword")
  public String savePassword(@RequestBody String json) throws Exception {
    try {
      PasswordDto dto = objectMapper.readValue(json, PasswordDto.class);
      Calendar cal = Calendar.getInstance();
      VerificationToken token = tokenService.get(dto.getToken());

      // check validity of token
      if (token == null) {
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Token does not exist.");
      } else if (token.getType() != TokenType.FORGOT_PW) {
        throw new ResponseStatusException(HttpStatus.GONE, "Wrong token type.");
      } else if ((token.getExpirationDate().getTime() - cal.getTime().getTime()) <= 0) {
        tokenService.delete(token.getId());
        throw new ResponseStatusException(HttpStatus.GONE, "Token expired.");
      }

      // update password
      User user = token.getUser();
      if (user.getId() != null) {

        BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
        user.setPassword(bcrypt.encode(dto.getNewPassword()));
        userService.updateUser(user);
        tokenService.delete(token.getId());
        return "redirect:/login";
      }

    } catch (JsonProcessingException e) {
      e.printStackTrace();
    } catch (RuntimeException e) {
      e.printStackTrace();
    }

    throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error resetting password");
  }
}
