package com.csci4050.bookstore.dto;

import com.csci4050.bookstore.model.Address;
import com.csci4050.bookstore.model.Card;
import com.csci4050.bookstore.model.Promotion;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;

public class OrderDto {

  private Address address;
  private Card payment;
  private Promotion promo;

  @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
  private LocalDateTime orderDate;

  public Address getAddress() {
    return this.address;
  }

  public void setAddress(Address address) {
    this.address = address;
  }

  public Card getPayment() {
    return this.payment;
  }

  public void setPayment(Card payment) {
    this.payment = payment;
  }

  public Promotion getPromo() {
    return this.promo;
  }

  public void setPromo(Promotion promo) {
    this.promo = promo;
  }

  public LocalDateTime getOrderDate() {
    return this.orderDate;
  }

  public void setOrderDate(LocalDateTime orderDate) {
    this.orderDate = orderDate;
  }
}
