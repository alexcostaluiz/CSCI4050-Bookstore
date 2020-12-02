package com.csci4050.bookstore.task;

import com.csci4050.bookstore.model.VerificationToken;
import com.csci4050.bookstore.service.TokenService;
import java.util.Calendar;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class TokenWipe {

  @Autowired private TokenService tokenService;

  /** Every five minutes, all expired tokens are deleted */
  @Scheduled(fixedRate = 300000)
  public void deleteExpiredTokens() {
    List<VerificationToken> tokens = tokenService.get();
    Calendar cal = Calendar.getInstance();
    for (VerificationToken verificationToken : tokens) {
      if ((verificationToken.getExpirationDate().getTime() - cal.getTime().getTime()) <= 0) {
        tokenService.delete(verificationToken.getId());
      }
    }
  }
}
