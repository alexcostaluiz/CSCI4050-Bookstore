package com.csci4050.bookstore.model;

import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.CascadeType;
import javax.persistence.OneToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

@Entity
public class RegisteredUser extends User {

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
  private Boolean subscription;

  @Enumerated(EnumType.STRING)
  @Column(name = "status")
  @NotNull
  private ActivityStatus status;

  @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "user")
  //@JoinColumn(name = "card_id")
  private List<Card> savedCards;

  @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "user")
  //@JoinColumn(name = "registered_user_id")
  private List<Order> orders;
}
