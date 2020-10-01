package com.csci4050.bookstore.model;

import java.util.List;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "book")
public class Book {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "book_id")
  @NotNull
  private Integer book_id;

  @Column(name = "isbn")
  @NotNull
  private Integer isbn;

  @Column(name = "pub_year")
  @NotNull
  private Integer pub_year;

  @Column(name = "stock")
  @NotNull
  private Integer stock;

  @Column(name = "min_thresh")
  @NotNull
  private Integer min_thresh;

  @Column(name = "buy_price")
  @NotNull
  private Float buy_price;

  @Column(name = "sell_price")
  @NotNull
  private Float sell_price;

  @Column(name = "title")
  @NotNull
  private String title;

  @Column(name = "cover_pic_path")
  @NotNull
  private String cover_pic_path;

  @Column(name = "edition")
  @NotNull
  private String edition;

  @Column(name = "publisher")
  @NotNull
  private String publisher;

  @Column(name = "category")
  @Enumerated(EnumType.STRING)
  private Category category;

  @ElementCollection
  @CollectionTable(name = "authors", joinColumns = @JoinColumn(name = "book_id"))
  private List<String> authors;

  @ElementCollection
  @CollectionTable(name = "tags", joinColumns = @JoinColumn(name = "book_id"))
  private List<String> tags;
}