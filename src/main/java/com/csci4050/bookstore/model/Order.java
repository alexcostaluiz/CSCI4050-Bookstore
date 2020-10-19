package com.csci4050.bookstore.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.GenerationType;
import javax.persistence.OneToOne;
import java.time.LocalDateTime;
import javax.persistence.CascadeType;
import javax.persistence.JoinColumn;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "book_order")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @NotNull
    private Integer id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    @NotNull
    private Address address;
  
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "payment_id", referencedColumnName = "id")
    @NotNull
    private Card payment;
  
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "promo", referencedColumnName = "id")
    private Promotion promo;
  
    @Column(name = "order_date")
    @NotNull
    private LocalDateTime orderDate;
  
    @Column(name = "confirmation_no")
    @NotNull
    private Integer confirmationNumber;
    
}