package com.csci4050.bookstore.model;

import com.csci4050.bookstore.json.BookMapDeserializer;
import com.csci4050.bookstore.json.BookMapSerializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import java.util.Map;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.MapKeyColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "cart")
@Inheritance(
    strategy =
        InheritanceType
            .JOINED) // joined is chosen to prevent conflicts with user_id mapping between order and
// cart
public class Cart {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Integer id;

  @OneToOne
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @ElementCollection
  @CollectionTable(
      name = "cart_book_mapping",
      joinColumns = {@JoinColumn(name = "cart_id", referencedColumnName = "id")})
  @MapKeyColumn(name = "book")
  @Column(name = "quantity")
  @JsonDeserialize(keyUsing = BookMapDeserializer.class)
  @JsonSerialize(keyUsing = BookMapSerializer.class)
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

  public void setUser(User user) {
    this.user = user;
  }
}
