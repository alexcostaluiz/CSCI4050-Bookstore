package com.csci4050.bookstore.model;

import java.time.LocalDateTime;
import java.time.ZoneId;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import org.hibernate.exception.ConstraintViolationException;

@Entity
@Table(name = "promotion")
public class Promotion {

  @Id
  @Column(name = "id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(name = "promo_code", unique = true, nullable = false)
  private String promoCode;

  @Column(name = "start_date", nullable = false, columnDefinition = "TIMESTAMP")
  private LocalDateTime startDate = LocalDateTime.now(ZoneId.of("UTC"));

  @Column(name = "end_date", nullable = false, columnDefinition = "TIMESTAMP")
  private LocalDateTime endDate = startDate.plusHours(8);

  @Column(name = "discount", nullable = false)
  private Double discount;

  public Integer getId() {
    return this.id;
  }

  public String getPromoCode() {
    return this.promoCode;
  }

  public void setPromoCode(String promoCode) {
    this.promoCode = promoCode;
  }

  public LocalDateTime getStartDate() {
    return this.startDate;
  }

  public void setStartDate(LocalDateTime startDate) throws ConstraintViolationException {
    if (startDate.isBefore(endDate)) {
      this.startDate = startDate;
      return;
    }
    throw new ConstraintViolationException("invalid start date", null, null);
  }

  public LocalDateTime getEndDate() {
    return this.endDate;
  }

  public void setEndDate(LocalDateTime endDate) throws ConstraintViolationException {
    if (endDate.isAfter(startDate)) {
      this.endDate = endDate;
      return;
    }
    throw new ConstraintViolationException("invalid end date", null, null);
  }

  public Double getDiscount() {
    return this.discount;
  }

  public void setDiscount(Double discount) throws ConstraintViolationException {
    if (discount >= 0 && discount <= 1) {
      this.discount = discount;
      return;
    }
    throw new ConstraintViolationException("invalid discound", null, null);
  }

  @Override
  public boolean equals(Object o) {
    if (!(o instanceof Promotion)) {
      return false;
    }
    return this.id == ((Promotion) o).getId();
  }
}
