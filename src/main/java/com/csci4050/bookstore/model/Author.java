package com.csci4050.bookstore.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name = "author")
public class Author {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Integer id;

  @Column(name = "name")
  private String name;

  @ManyToMany
  @JoinTable(
      name = "author_books",
      joinColumns = @JoinColumn(name = "author_id"),
      inverseJoinColumns = @JoinColumn(name = "book_id"))
  @JsonIgnore
  private List<Book> books;

  @Column(name = "role")
  private String role;

  @Override
  public String toString() {
    return name;
  }

  @Override
  public boolean equals(Object author) {
    if (author instanceof Author) {
      return name.equals(((Author) author).getName());
    }
    return false;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getName() {
    return this.name;
  }

  public void setBooks(List<Book> books) {
    this.books = books;
  }

  public List<Book> getBooks() {
    return this.books;
  }
}
