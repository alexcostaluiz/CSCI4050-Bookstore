package com.csci4050.bookstore.model;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrimaryKeyJoinColumn;

//order is a reserved keyword, so it must be escaped
@Entity(name="\"order\"")
@PrimaryKeyJoinColumn(name = "orderId")
public class Order extends Cart {

  @ManyToOne
  @JoinColumn(name = "address_id", referencedColumnName = "id", nullable = false)
  private Address address;

  @ManyToOne
  @JoinColumn(name = "card_id", referencedColumnName = "id", nullable = false)
  private Card payment;

  @ManyToOne
  @JoinColumn(name = "promo_id", referencedColumnName = "id")
  private Promotion promo;

  @Column(name = "order_date", nullable = false)
  private LocalDateTime orderDate;

  @Column(name = "confirmation_no", nullable = false)
  private Integer confirmationNumber;
}
