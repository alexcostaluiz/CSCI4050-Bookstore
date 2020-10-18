package com.csci4050.bookstore.model;

import java.util.List;
import javax.persistence.Enumerated;
import javax.persistence.EnumType;
import javax.persistence.CollectionTable;
import javax.persistence.ElementCollection;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "registered_users")
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

    @Column(name = "subscription")
    @NotNull
    private Boolean subscription;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    @NotNull
    private ActivityStatus status;
    
    @ElementCollection
    @Column(name = "card")
    @CollectionTable(name = "cards", joinColumns = @JoinColumn(name = "id"))
    private List<Card> savedCards;

/*     @ElementCollection
    @Column(name = "order")
    @CollectionTable(name = "orders", joinColumns = @JoinColumn(name = "id"))
    private List<Order> orders;
 */
}