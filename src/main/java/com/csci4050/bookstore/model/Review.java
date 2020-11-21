package com.csci4050.bookstore.model;

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
  private Integer stars;

  @Column(name = "description")
  private String description;

  @Column(name = "spoiler")
  private boolean containsSpoilers;

  @Column(name = "reccomended")
  private boolean reccomended;

  @ManyToOne
  @JoinColumn(name = "book_id", nullable = false)
  private Book book;

  public Book getBook() {
    return this.book;
  }

  public void setBook(Book book) {
    this.book = book;
  }

  public Integer getId() {
    return this.id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public Integer getStars() {
    return this.stars;
  }

  public void setStars(Integer stars) throws Exception {
    if (stars >= 0 && stars <= 5) {
      this.stars = stars;
    } else {
      throw new Exception("Star number > 5 or < 0");
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

  public boolean isReccomended() {
    return this.reccomended;
  }

  public void setReccomended(boolean reccomended) {
    this.reccomended = reccomended;
  }
}
