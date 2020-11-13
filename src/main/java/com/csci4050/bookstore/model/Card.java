package com.csci4050.bookstore.model;

import com.csci4050.bookstore.CardNumberConverter;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "card")
public class Card {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  @NotNull
  private Integer id;

  @ManyToOne(optional = false, fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", referencedColumnName = "id")
  private User user;

  @Column(name = "card_type")
  private String cardType;

  @Column(name = "number")
  @Convert(converter = CardNumberConverter.class)
  private String number;

  @Column(name = "name")
  private String name;

  @Column(name = "expiry")
  private String expiry;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "address_id", referencedColumnName = "id", nullable = true)
  private Address address;

  public Integer getId() {
    return this.id;
  }

  public String getNumber() {
    return this.number;
  }

  public void setNumber(String number) {
    this.number = number;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getExpiry() {
    return this.expiry;
  }

  public void setExpiry(String expiry) {
    this.expiry = expiry;
  }

  public String getCardType() {
    return this.cardType;
  }

  public void setCardType(String type) {
    this.cardType = type;
  }

  public Address getAddress() {
    return this.address;
  }

  public void setAddress(Address address) {
    this.address = address;
  }

  @Override
  public boolean equals(Object o) {
    if (o instanceof Card) {
      Card c = (Card) o;
      return this.id == c.id;
    }
    return false;
  }
}
