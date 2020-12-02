package com.csci4050.bookstore.events;

import com.csci4050.bookstore.model.Promotion;
import com.csci4050.bookstore.model.TokenType;
import com.csci4050.bookstore.model.User;
import com.csci4050.bookstore.model.VerificationToken;
import com.csci4050.bookstore.service.PromoService;
import com.csci4050.bookstore.service.TokenService;
import com.csci4050.bookstore.service.UserService;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.http.HttpStatus;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.session.SessionInformation;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

@Component
public class Listener {

  @Autowired private UserService userService;
  @Autowired private JavaMailSender mailSender;
  @Autowired private HttpServletRequest request;
  @Autowired private PromoService promoService;
  @Autowired private TokenService tokenService;
  @Autowired private SessionRegistry sessionRegistry;

  @EventListener
  public void resetPassword(PasswordResetEvent event) {
    User user = userService.getUser(event.getUser().getEmailAddress());
    String token =
        UUID.randomUUID().toString(); // cryptographically strong pseudo random 128-bit value
    VerificationToken myToken = new VerificationToken(token, user, TokenType.FORGOT_PW);
    tokenService.save(myToken);

    String recipientAddress = user.getEmailAddress();
    String subject = "Password Reset Link";
    String confirmationUrl = event.getUrl() + "/updatePassword?token=" + token;

    SimpleMailMessage email = new SimpleMailMessage();
    email.setTo(recipientAddress);
    email.setSubject(subject);
    String ref = request.getHeader("referer");
    ref = ref.substring(0, ref.lastIndexOf("/"));
    email.setText("\r\n" + ref + confirmationUrl);
    try {
      mailSender.send(email);
    } catch (MailException e) {
      e.printStackTrace();
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Mail failed to send");
    }
  }

  @EventListener
  private void confirmRegistration(RegistrationCompletionEvent event) {

    User user = userService.getUser(event.getUser().getEmailAddress());
    VerificationToken myToken;

    // resend already existing token if user has been saved
    if (event.isSaved()) {
      myToken =
          user.getTokens().stream()
              .filter(
                  t -> {
                    return t.getType() == TokenType.REGISTRATION;
                  })
              .findFirst()
              .get();
    } else {
      String token =
          UUID.randomUUID().toString(); // cryptographically strong pseudo random 128-bit value
      myToken = new VerificationToken(token, user, TokenType.REGISTRATION);
      tokenService.save(myToken);
    }

    String recipientAddress = user.getEmailAddress();
    String subject = "Account Registration Confirmation";
    String confirmationUrl = event.getUrl() + "/event/accountConfirm?token=" + myToken.getToken();

    SimpleMailMessage email = new SimpleMailMessage();
    email.setTo(recipientAddress);
    email.setSubject(subject);
    String ref = request.getHeader("referer");
    if (ref != null) {
      ref = ref.substring(0, ref.lastIndexOf("/"));
    }
    email.setText("\r\n" + ref + confirmationUrl);
    try {
      mailSender.send(email);
    } catch (MailException e) {
      e.printStackTrace();
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Mail failed to send");
    }
  }

  @EventListener
  private void sendPromos(EmailPromoEvent event) {
    List<User> subbed_users = userService.getSubbed();
    if (subbed_users.size() == 0) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No subscribed users exist.");
    }
    for (User user : subbed_users) {
      String recipientAddress = user.getEmailAddress();
      String subject = "New bookstore promotion!!";
      Promotion promo = event.getPromo();
      try {
        // send specific promo
        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(recipientAddress);
        email.setSubject(subject);
        email.setText(
            "Use promo code "
                + promo.getPromoCode()
                + " to get discounts on books with this description: \n"
                + promo.getDescription());
        mailSender.send(email);
        promo.setEmailed(true);
        promoService.update(promo);

      } catch (MailException e) {
        e.printStackTrace();
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Mail failed to send");
      }
    }
  }

  @EventListener
  private void expireUser(ExpireUserEvent event) {

    List<Object> loggedUsers = sessionRegistry.getAllPrincipals();
    for (Object principal : loggedUsers) {
      if (principal instanceof UserDetails) {
        UserDetails loggedUser = (UserDetails) principal;
        if (event.getEmail().equals(loggedUser.getUsername())) {
          List<SessionInformation> sessionsInfo = sessionRegistry.getAllSessions(principal, false);
          if (null != sessionsInfo && sessionsInfo.size() > 0) {
            for (SessionInformation sessionInformation : sessionsInfo) {
              sessionInformation.expireNow();
            }
          }
        }
      }
    }
  }

  @EventListener
  private void emailOrder(OrderEvent event) {
    String recipientAddress = event.getUser().getEmailAddress();
    String subject = "Order confirmation";
    String message = "Your order has been sent! Your order no is: " + event.getOrder().getId();
    SimpleMailMessage email = new SimpleMailMessage();
    email.setTo(recipientAddress);
    email.setSubject(subject);
    email.setText(message);
    try {
      mailSender.send(email);
    } catch (MailException e) {
      e.printStackTrace();
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Mail failed to send");
    }
  }
}
