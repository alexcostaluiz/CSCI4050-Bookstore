package com.csci4050.bookstore.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
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
  @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
  private LocalDateTime startDate = LocalDateTime.now(ZoneId.of("UTC"));

  @Column(name = "end_date", nullable = false, columnDefinition = "TIMESTAMP")
  @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
  private LocalDateTime endDate = startDate.plusHours(8);

  @Column(name = "discount", nullable = false)
  private Double discount;

  @Column(name = "description")
  private String description;

  @OneToMany(mappedBy = "promo")
  @JsonManagedReference
  private List<Book> books;

  @Column(name = "emailed", nullable = false)
  private boolean emailed = false;

  public Integer getId() {
    return this.id;
  }

  public String getPromoCode() {
    return this.promoCode;
  }

  public void setPromoCode(String promoCode) {
    this.promoCode = promoCode;
  }

  public String getDescription() {
    return this.description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public List<Book> getBooks() {
    return this.books;
  }

  public void setBooks(List<Book> books) {
    this.books = books;
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

  public boolean isEmailed() {
    return emailed;
  }

  public void setEmailed(boolean emailed) {
    this.emailed = emailed;
  }

  @Override
  public boolean equals(Object o) {
    if (!(o instanceof Promotion)) {
      return false;
    }
    return this.id == ((Promotion) o).getId();
  }
}
