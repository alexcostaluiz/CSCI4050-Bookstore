package com.csci4050.bookstore.events;

import com.csci4050.bookstore.model.User;
import com.csci4050.bookstore.service.UserService;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
public class UserStateChangeListener {

  @Autowired private UserService userService;
  @Autowired private JavaMailSender mailSender;

  @EventListener
  public void resetPassword(PasswordResetEvent event) {
    User user = event.getUser();
    String token =
        UUID.randomUUID().toString(); // cryptographically strong pseudo random 128-bit value
    userService.createVerificationToken(user, token);

    String recipientAddress = user.getEmailAddress();
    String subject = "Password Reset Link";
    String confirmationUrl = event.getUrl() + "/updatePassword?token=" + token;

    SimpleMailMessage email = new SimpleMailMessage();
    email.setTo(recipientAddress);
    email.setSubject(subject);
    email.setText("\r\n" + "http://localhost:8080" + confirmationUrl);
    mailSender.send(email);
  }

  @EventListener
  private void confirmRegistration(RegistrationCompletionEvent event) {

    User user = event.getUser();
    String token =
        UUID.randomUUID().toString(); // cryptographically strong pseudo random 128-bit value
    userService.createVerificationToken(user, token);

    String recipientAddress = user.getEmailAddress();
    String subject = "Account Registration Confirmation";
    String confirmationUrl = event.getUrl() + "/registration/accountConfirm?token=" + token;

    SimpleMailMessage email = new SimpleMailMessage();
    email.setTo(recipientAddress);
    email.setSubject(subject);
    email.setText("\r\n" + "http://localhost:8080" + confirmationUrl);
    mailSender.send(email);
  }
}
