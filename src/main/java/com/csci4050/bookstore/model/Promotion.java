package com.csci4050.bookstore.model;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "promotion")
public class Promotion {

  @Id
  @Column(name = "promo_code")
  @NotNull
  private String promoCode;

  @Column(name = "start_date")
  @NotNull
  private LocalDateTime startDate;

  @Column(name = "end_date")
  @NotNull
  private LocalDateTime endDate;

  @Column(name = "discount")
  @NotNull
  private Double discount;

  public Promotion() {}
}
