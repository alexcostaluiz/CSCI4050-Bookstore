package com.csci4050.bookstore.model;

import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "author")
public class Author {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Integer id;

  @Column(name = "name", unique = true)
  private String name;

  @OneToMany(mappedBy = "author", cascade = CascadeType.ALL)
  private List<AuthorBookAssociation> books;

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

  public void setBooks(List<AuthorBookAssociation> books) {
    this.books = books;
  }

  public List<AuthorBookAssociation> getBooks() {
    return this.books;
  }

  public Integer getId() {
    return this.id;
  }
}
