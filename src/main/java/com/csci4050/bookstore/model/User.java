package com.csci4050.bookstore.model;

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
public class User {

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
  private String password; // Super secure

  @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
  @JoinColumn(name = "address_id")
  private Address address;

  @Column(name = "subscription")
  @NotNull
  private Boolean subscription = false;

  @Enumerated(EnumType.STRING)
  @Column(name = "status")
  @NotNull
  private ActivityStatus status = ActivityStatus.Active;

  @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "user")
  private List<Card> savedCards;

  @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "user")
  private List<Order> orders;

  @ElementCollection
  @Column(name = "roles")
  @Enumerated(EnumType.STRING)
  @CollectionTable(name = "roles", joinColumns = @JoinColumn(name = "id"))
  private List<Role> roles;

  public List<Role> getRoles() {
    return roles;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public ActivityStatus getActivityStatus() {
    return status;
  }

  public Cart getCart() {
    return this.cart;
  }

  public void setCart(Cart cart) {
    this.cart = cart;
  }

  public Integer getId() {
    return this.id;
  }

  public String getEmail() {
    return this.emailAddress;
  }
}
