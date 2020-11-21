package com.csci4050.bookstore.model;

import com.csci4050.bookstore.json.BookMapDeserializer;
import com.csci4050.bookstore.json.BookMapSerializer;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapKeyJoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "user")
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Integer id;

  @Column(name = "first_name", nullable = false)
  private String firstName;

  @Column(name = "last_name", nullable = false)
  private String lastName;

  @Column(name = "email", unique = true, nullable = false)
  private String emailAddress;

  @Column(name = "phone", nullable = false)
  private String phoneNumber;

  @Column(name = "password", nullable = false)
  private String password;

  @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
  private List<Address> addresses = new ArrayList<>();

  @Column(name = "subscription", nullable = false)
  private Boolean subscription = false;

  @Enumerated(EnumType.STRING)
  @Column(name = "status", nullable = false)
  private ActivityStatus status = ActivityStatus.Inactive;

  @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
  private List<Card> savedCards = new ArrayList<>();

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
  private List<Order> orders;

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
  private List<VerificationToken> tokens;

  @ElementCollection
  @Column(name = "roles")
  @Enumerated(EnumType.STRING)
  @CollectionTable(name = "roles", joinColumns = @JoinColumn(name = "id"))
  private List<Role> roles = Arrays.asList(Role.USER);

  @ElementCollection
  @CollectionTable(
      name = "cart",
      joinColumns = @JoinColumn(name = "user_id", updatable = false, insertable = false))
  @MapKeyJoinColumn(name = "book_id", referencedColumnName = "id", updatable = true)
  @Column(name = "quantity")
  @JsonDeserialize(keyUsing = BookMapDeserializer.class)
  @JsonSerialize(keyUsing = BookMapSerializer.class)
  private Map<Book, Integer> cart;

  public Integer getId() {
    return this.id;
  }

  public Map<Book, Integer> getCart() {
    return this.cart;
  }

  public void setCart(Map<Book, Integer> cart) {
    this.cart = cart;
  }

  @JsonSetter("id")
  public void setId(Integer id) {
    this.id = id;
  }

  public String getFirstName() {
    return this.firstName;
  }

  @JsonSetter("firstName")
  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return this.lastName;
  }

  @JsonSetter("lastName")
  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public String getEmailAddress() {
    return this.emailAddress;
  }

  @JsonSetter("emailAddress")
  public void setEmailAddress(String emailAddress) {
    this.emailAddress = emailAddress;
  }

  public String getPhoneNumber() {
    return this.phoneNumber;
  }

  @JsonSetter("phoneNumber")
  public void setPhoneNumber(String phoneNumber) {
    this.phoneNumber = phoneNumber;
  }

  public String getPassword() {
    return this.password;
  }

  @JsonSetter("password")
  public void setPassword(String password) {
    this.password = password;
  }

  public List<Address> getAddresses() {
    return this.addresses;
  }

  @JsonSetter("addresses")
  public void setAddresses(List<Address> addresses) {
    for (Address a : addresses) {
      a.setUser(this);
    }
    this.addresses = addresses;
  }

  public Boolean getSubscription() {
    return this.subscription;
  }

  @JsonSetter("subscription")
  public void setSubscription(Boolean subscription) {
    this.subscription = subscription;
  }

  public ActivityStatus getStatus() {
    return this.status;
  }

  @JsonSetter("status")
  public void setStatus(ActivityStatus status) {
    this.status = status;
  }

  public List<Card> getSavedCards() {
    return this.savedCards;
  }

  @JsonSetter("savedCards")
  public void setSavedCards(List<Card> savedCards) {
    for (Card c : savedCards) {
      c.setUser(this);
    }
    this.savedCards = savedCards;
  }

  public List<Order> getOrders() {
    return this.orders;
  }

  @JsonSetter("orders")
  public void setOrders(List<Order> orders) {

    for (Order o : orders) {
      o.setUser(this);
    }
    this.orders = orders;
  }

  public List<Role> getRoles() {
    return this.roles;
  }

  @JsonSetter("roles")
  public void setRoles(List<Role> roles) {
    this.roles = roles;
  }

  public List<VerificationToken> getTokens() {
    return this.tokens;
  }

  public void setTokens(List<VerificationToken> tokens) {
    this.tokens = tokens;
  }
}
