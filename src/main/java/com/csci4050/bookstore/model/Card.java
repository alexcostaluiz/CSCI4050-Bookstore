package com.csci4050.bookstore.model;

import java.time.LocalDate;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.csci4050.bookstore.CardNumberConverter;

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

  @Column(name = "acct_num")
  @Convert(converter = CardNumberConverter.class)
  private String acctNum;

  @ManyToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "address_id", referencedColumnName = "id")
  private Address address;

  @Column(name = "exp_date")
  private LocalDate expDate;

  @Column(name = "card_type")
  @Enumerated(EnumType.STRING)
  private CardType cardType;

  public Integer getId() {
    return this.id;
  }

  public String getAcctNum() {
    return this.acctNum;
  }

  public void setAcctNum(String acctNum) {
    this.acctNum = acctNum;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public Address getAddress() {
    return this.address;
  }

  public void setAddress(Address address) {
    this.address = address;
  }

  public LocalDate getExpDate() {
    return this.expDate;
  }

  public void setExpDate(LocalDate expDate) {
    this.expDate = expDate;
  }

  public CardType getCardType() {
    return this.cardType;
  }

  public void setCardType(CardType type) {
    this.cardType = type;
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
