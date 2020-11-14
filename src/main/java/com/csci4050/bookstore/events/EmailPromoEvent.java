package com.csci4050.bookstore.events;

import com.csci4050.bookstore.model.Promotion;
import org.springframework.context.ApplicationEvent;

public class EmailPromoEvent extends ApplicationEvent {
  private static final long serialVersionUID = 7823497L;
  private Promotion promo = null;

  public EmailPromoEvent(Promotion promo) {
    super(promo);
    this.promo  = promo;
  }
  public Promotion getPromo() {
    return this.promo;
  }
}
