package com.csci4050.bookstore.model;

import com.csci4050.bookstore.service.UserService;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
public class RegistrationListener implements ApplicationListener<RegistrationCompletionEvent> {

  @Autowired private UserService userService;
  @Autowired private JavaMailSender mailSender;

  @Override
  public void onApplicationEvent(RegistrationCompletionEvent event) {
    this.confirmRegistration(event);
  }

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
