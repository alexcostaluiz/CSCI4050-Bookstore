package com.csci4050.bookstore.model;

import com.csci4050.bookstore.dto.ReviewDto;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "review")
public class Review {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Integer id;

  @Column(name = "stars")
  private Float stars;

  @Column(name = "description")
  private String description;

  @Column(name = "spoiler")
  private boolean containsSpoilers;

  @Column(name = "recommended")
  private boolean recommended;

  @ManyToOne
  @JoinColumn(name = "book_id", nullable = false)
  private Book book;

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  public User getUser() {
    return this.user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public Book getBook() {
    return this.book;
  }

  public void setBook(Book book) {
    this.book = book;
  }

  public Integer getId() {
    return this.id;
  }

  private void setId(Integer id) {
    this.id = id;
  }

  public Float getStars() {
    return this.stars;
  }

  public void setStars(Float stars) throws Exception {
    if (stars >= 0 && stars <= 5 && stars % 0.5 == 0) {
      this.stars = stars;
    } else {
      throw new Exception("Incorrect star number");
    }
  }

  public String getDescription() {
    return this.description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public boolean containsSpoilers() {
    return this.containsSpoilers;
  }

  public void setContainsSpoilers(boolean containsSpoilers) {
    this.containsSpoilers = containsSpoilers;
  }

  public boolean isRecommended() {
    return this.recommended;
  }

  public void setRecommended(boolean recommended) {
    this.recommended = recommended;
  }

  public static Review dtoToReview(ReviewDto dto) throws Exception {
    Review review = new Review();
    review.setId(dto.getId());
    review.setBook(dto.getBook());
    review.setUser(dto.getUser());
    review.setContainsSpoilers(dto.containsSpoilers());
    review.setDescription(dto.getDescription());
    review.setRecommended(dto.isRecommended());
    review.setStars(dto.getStars());

    return review;
  }

  public static ReviewDto reviewToDto(Review review) throws Exception {
    ReviewDto dto = new ReviewDto();
    dto.setId(review.getId());
    dto.setBook(review.getBook());
    dto.setUser(review.getUser());
    dto.setContainsSpoilers(review.containsSpoilers());
    dto.setDescription(review.getDescription());
    dto.setRecommended(review.isRecommended());
    dto.setStars(review.getStars());

    return dto;
  }
}
