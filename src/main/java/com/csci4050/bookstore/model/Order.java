package com.csci4050.bookstore.model;

import java.time.LocalDateTime;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;

@Entity
public class Order extends Cart {

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "address_id", referencedColumnName = "id")
  @NotNull
  private Address address;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "payment_id", referencedColumnName = "id")
  @NotNull
  private Card payment;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "promo", referencedColumnName = "id")
  private Promotion promo;

  @Column(name = "order_date")
  @NotNull
  private LocalDateTime orderDate;

  @Column(name = "confirmation_no")
  @NotNull
  private Integer confirmationNumber;
}
