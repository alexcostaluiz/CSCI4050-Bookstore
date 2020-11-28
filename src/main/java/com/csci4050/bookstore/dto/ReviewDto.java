package com.csci4050.bookstore.dto;

import com.csci4050.bookstore.model.Book;
import com.csci4050.bookstore.model.User;

public class ReviewDto {

  public Integer id;
  private Float stars;
  private String description;
  private boolean containsSpoilers;
  private boolean recommended;
  private Book book;
  private User user;

  public User getUser() {
    return this.user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public Integer getId() {
    return this.id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public Book getBook() {
    return this.book;
  }

  public void setBook(Book book) {
    this.book = book;
  }

  public Float getStars() {
    return this.stars;
  }

  public void setStars(Float stars) {
      this.stars = stars;
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
}
