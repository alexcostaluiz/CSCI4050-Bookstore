package com.csci4050.bookstore.model;

import java.util.Map;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapKeyColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "cart")
public class Cart {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  @NotNull
  private Integer id;

  @OneToOne
  @JoinColumn(name = "user_id")
  @NotNull
  private User user;

  @ElementCollection
  @CollectionTable(
      name = "cart_book_mapping",
      joinColumns = {@JoinColumn(name = "cart_id", referencedColumnName = "id")})
  @MapKeyColumn(name = "book")
  @Column(name = "quantity")
  private Map<Book, Integer> books;

  public Map<Book, Integer> getBooks() {
    return this.books;
  }

  public void setBooks(Map<Book, Integer> books) {
    this.books = books;
  }

  public Integer getId() {
    return this.id;
  }
}
