package com.csci4050.bookstore.model;

import java.util.Date;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
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

  @Column(name = "acct_num")
  private Integer acctNum;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "address_id", referencedColumnName = "id")
  private Address address;

  @Column(name = "exp_date")
  private Date expDate;

  @Column(name = "cvv")
  private Integer cvv;

  @Column(name = "card_type")
  private CardType cardType;

  public Integer getId() {
    return this.id;
  }

  public Integer getAcctNum() {
    return this.acctNum;
  }

  public void setAcctNum(Integer acctNum) {
    this.acctNum = acctNum;
  }

  public Address getAddress() {
    return this.address;
  }

  public void setAddress(Address address) {
    this.address = address;
  }

  public Date getExpDate() {
    return this.expDate;
  }

  public void setExpDate(Date expDate) {
    this.expDate = expDate;
  }

  public Integer getCvv() {
    return this.cvv;
  }

  public void setCvv(Integer cvv) {
    this.cvv = cvv;
  }

  public CardType getCardType() {
    return this.cardType;
  }

  public void setCardType(CardType type) {
    this.cardType = type;
  }
}
