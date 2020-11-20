package com.csci4050.bookstore.model;

import com.csci4050.bookstore.json.BookMapDeserializer;
import com.csci4050.bookstore.json.BookMapSerializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import java.time.LocalDateTime;
import java.util.Map;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapKeyJoinColumn;
import javax.persistence.PrimaryKeyJoinColumn;

// order is a reserved keyword, so it must be escaped
@Entity(name = "\"order\"")
@PrimaryKeyJoinColumn(name = "orderId")
public class Order {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Integer id;

  @ManyToOne(optional = false, fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", referencedColumnName = "id")
  private User user;

  @ManyToOne
  @JoinColumn(name = "address_id", referencedColumnName = "id", nullable = false, updatable = false)
  private Address address;

  @ManyToOne
  @JoinColumn(name = "card_id", referencedColumnName = "id", nullable = false, updatable = false)
  private Card payment;

  @ManyToOne
  @JoinColumn(name = "promo_id", referencedColumnName = "id", nullable = true, updatable = false)
  private Promotion promo;

  @Column(name = "order_date", nullable = false, updatable = false)
  private LocalDateTime orderDate;

  @Column(name = "confirmation_no", nullable = false, updatable = false)
  private Integer confirmationNumber;

  @ElementCollection
  @CollectionTable(
      name = "order_cart",
      joinColumns = @JoinColumn(name = "order_id", updatable = false))
  @MapKeyJoinColumn(name = "book_id", referencedColumnName = "id", updatable = false)
  @Column(name = "quantity", updatable = false, insertable = false)
  @JsonDeserialize(keyUsing = BookMapDeserializer.class)
  @JsonSerialize(keyUsing = BookMapSerializer.class)
  private Map<Book, Integer> cart;

  public User getUser() {
    return this.user;
  }

  public void setUser(User user) {
    this.user = user;
  }
}
