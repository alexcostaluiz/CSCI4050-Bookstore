package com.csci4050.bookstore.controller;

import com.csci4050.bookstore.model.ActivityStatus;
import com.csci4050.bookstore.model.User;
import com.csci4050.bookstore.model.VerificationToken;
import com.csci4050.bookstore.service.UserService;
import java.util.Calendar;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/registration")
public class RegistrationController {

  @Autowired private UserService userService;

  @GetMapping("/accountConfirm")
  public String confirmAccount(@RequestParam("token") String token) {

    VerificationToken verificationToken = userService.getVerificationToken(token);

    if (verificationToken == null) {
      return "<h1> Token does not exist </h1>";
    }

    User user = verificationToken.getUser();
    Calendar cal = Calendar.getInstance();
    if ((verificationToken.getExpirationDate().getTime() - cal.getTime().getTime()) <= 0) {
      userService.deleteToken(verificationToken);
      return "<h1> Token expired </h1>";
    }

    user.setStatus(ActivityStatus.Active);
    userService.updateUser(user);
    userService.deleteToken(verificationToken);
    return "redirect:/login";
  }

  @PostMapping("/savePassword")
  public String savePassword(PasswordDto dto) throws Exception {
    VerificationToken token = userService.getVerificationToken(dto.getToken());

    if (token == null) {
      return "<h1> Token does not exist </h1>";
    }

    User user = token.getUser();

    if (user.getId() != null) {
      BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
      user.setPassword(bcrypt.encode(dto.getNewPassword()));
      userService.updateUser(user);
      return "redirect:/login";
    } else {
      throw new Exception("failure changing password");
    }
  }
}
