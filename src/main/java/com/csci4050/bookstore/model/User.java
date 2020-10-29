package com.csci4050.bookstore.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonSetter;
import java.util.List;
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
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "user")
@JsonIgnoreProperties(ignoreUnknown = true)
public class User {
  public User() {}

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  @NotNull
  private Integer id;

  @OneToOne(cascade = CascadeType.ALL, mappedBy = "user")
  @NotNull
  private Cart cart = new Cart();

  @Column(name = "first_name")
  @NotNull
  private String firstName;

  @Column(name = "last_name")
  @NotNull
  private String lastName;

  @Column(name = "email")
  @NotNull
  private String emailAddress;

  @Column(name = "phone")
  @NotNull
  private String phoneNumber;

  @Column(name = "password")
  @NotNull
  private String password;
  // Super secure

  @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
  @JoinColumn(name = "address_id")
  private Address address;

  @Column(name = "subscription")
  @NotNull
  private Boolean subscription = false;

  @Enumerated(EnumType.STRING)
  @Column(name = "status")
  @NotNull
  private ActivityStatus status = ActivityStatus.Inactive;

  @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "user")
  private List<Card> savedCards;

  @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "user")
  private List<Order> orders;

  @ElementCollection
  @Column(name = "roles")
  @Enumerated(EnumType.STRING)
  @CollectionTable(name = "roles", joinColumns = @JoinColumn(name = "id"))
  private List<Role> roles;

  public Integer getId() {
    return this.id;
  }

  @JsonSetter("id")
  public void setId(Integer id) {
    this.id = id;
  }

  public Cart getCart() {
    return this.cart;
  }

  @JsonSetter("cart")
  public void setCart(Cart cart) {
    this.cart = cart;
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

  public Address getAddress() {
    return this.address;
  }

  @JsonSetter("address")
  public void setAddress(Address address) {
    this.address = address;
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
    this.savedCards = savedCards;
  }

  public List<Order> getOrders() {
    return this.orders;
  }

  @JsonSetter("orders")
  public void setOrders(List<Order> orders) {
    this.orders = orders;
  }

  public List<Role> getRoles() {
    return this.roles;
  }

  @JsonSetter("roles")
  public void setRoles(List<Role> roles) {
    this.roles = roles;
  }
}
