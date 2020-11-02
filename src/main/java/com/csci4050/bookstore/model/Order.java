package com.csci4050.bookstore.model;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

@Entity
public class Order extends Cart {

  @ManyToOne
  @JoinColumn(name = "user_id")
  @NotNull
  private User user;

  @ManyToOne
  @JoinColumn(name = "address_id", referencedColumnName = "id")
  @NotNull
  private Address address;

  @ManyToOne
  @JoinColumn(name = "card_id", referencedColumnName = "id")
  @NotNull
  private Card payment;

  @ManyToOne
  @JoinColumn(name = "promo_id", referencedColumnName = "id")
  private Promotion promo;

  @Column(name = "order_date")
  @NotNull
  private LocalDateTime orderDate;

  @Column(name = "confirmation_no")
  @NotNull
  private Integer confirmationNumber;

  public void setUser(User user) {
    this.user = user;
  }
}
