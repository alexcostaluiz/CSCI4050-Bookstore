package com.csci4050.bookstore.events;

import com.csci4050.bookstore.model.Promotion;
import com.csci4050.bookstore.model.User;
import com.csci4050.bookstore.service.PromoService;
import com.csci4050.bookstore.service.UserService;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
public class Listener {

  @Autowired private UserService userService;
  @Autowired private JavaMailSender mailSender;
  @Autowired private HttpServletRequest request;
  @Autowired private PromoService promoService;

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
    String ref = request.getHeader("referer");
    ref = ref.substring(0, ref.lastIndexOf("/"));
    email.setText("\r\n" + ref + confirmationUrl);
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
    String confirmationUrl = event.getUrl() + "/event/accountConfirm?token=" + token;

    SimpleMailMessage email = new SimpleMailMessage();
    email.setTo(recipientAddress);
    email.setSubject(subject);
    String ref = request.getHeader("referer");
    ref = ref.substring(0, ref.lastIndexOf("/"));
    email.setText("\r\n" + ref + confirmationUrl);
    mailSender.send(email);
  }

  @EventListener
  private void sendPromos(EmailPromoEvent event) {
    List<User> subbed_users = userService.getSubbed();
    
    for (User user : subbed_users) {
      String recipientAddress = user.getEmailAddress();
      String subject = "New bookstore promotion!!";
      Promotion promo = event.getPromo();
      if(promo == null){
        //send all promos
        List<Promotion> promos = promoService.get();
        for (Promotion p : promos) {
          SimpleMailMessage email = new SimpleMailMessage();
          email.setTo(recipientAddress);
          email.setSubject(subject);
          email.setText("Use promo code " + p.getPromoCode() + " to get discounts on books with this description: \n" + p.getDescription());
          mailSender.send(email);
          p.setEmailed(true);
          promoService.update(promo);
        }
        
      } else {
        //send specific promo
        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(recipientAddress);
        email.setSubject(subject);
        email.setText("Use promo code " + promo.getPromoCode() + " to get discounts on books with this description: \n" + promo.getDescription());
        mailSender.send(email);
        promo.setEmailed(true);
        promoService.update(promo);
      }
      
    }
  }
}
