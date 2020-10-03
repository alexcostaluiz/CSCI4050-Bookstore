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
  private Double buy_price;

  @Column(name = "sell_price")
  @NotNull
  private Double sell_price;

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

  public Book() {}

  public Book(
      int isbn,
      int pub_year,
      int stock,
      int min_thresh,
      Double buy_price,
      Double sell_price,
      String title,
      String cover_pic_path,
      String edition,
      String publisher,
      Category category,
      List<String> authors,
      List<String> tags) {
    this.isbn = isbn;
    this.pub_year = pub_year;
    this.stock = stock;
    this.min_thresh = min_thresh;
    this.buy_price = buy_price;
    this.sell_price = sell_price;
    this.title = title;
    this.cover_pic_path = cover_pic_path;
    this.edition = edition;
    this.publisher = publisher;
    this.category = category;
    this.authors = authors;
    this.tags = tags;
  }

  public Book(
      int isbn,
      int pub_year,
      int stock,
      int min_thresh,
      Double buy_price,
      Double sell_price,
      String title,
      String cover_pic_path,
      String edition,
      String publisher,
      Category category,
      List<String> authors) {
    this.isbn = isbn;
    this.pub_year = pub_year;
    this.stock = stock;
    this.min_thresh = min_thresh;
    this.buy_price = buy_price;
    this.sell_price = sell_price;
    this.title = title;
    this.cover_pic_path = cover_pic_path;
    this.edition = edition;
    this.publisher = publisher;
    this.category = category;
    this.authors = authors;
  }

  public Integer getBook_id() {
    return this.book_id;
  }

  public void setBook_id(Integer book_id) {
    this.book_id = book_id;
  }

  public Integer getIsbn() {
    return this.isbn;
  }

  public void setIsbn(Integer isbn) {
    this.isbn = isbn;
  }

  public Integer getPub_year() {
    return this.pub_year;
  }

  public void setPub_year(Integer pub_year) {
    this.pub_year = pub_year;
  }

  public Integer getStock() {
    return this.stock;
  }

  public void setStock(Integer stock) {
    this.stock = stock;
  }

  public Integer getMin_thresh() {
    return this.min_thresh;
  }

  public void setMin_thresh(Integer min_thresh) {
    this.min_thresh = min_thresh;
  }

  public Double getBuy_price() {
    return this.buy_price;
  }

  public void setBuy_price(Double buy_price) {
    this.buy_price = buy_price;
  }

  public Double getSell_price() {
    return this.sell_price;
  }

  public void setSell_price(Double sell_price) {
    this.sell_price = sell_price;
  }

  public String getTitle() {
    return this.title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getCover_pic_path() {
    return this.cover_pic_path;
  }

  public void setCover_pic_path(String cover_pic_path) {
    this.cover_pic_path = cover_pic_path;
  }

  public String getEdition() {
    return this.edition;
  }

  public void setEdition(String edition) {
    this.edition = edition;
  }

  public String getPublisher() {
    return this.publisher;
  }

  public void setPublisher(String publisher) {
    this.publisher = publisher;
  }

  Category getCategory() {
    return this.category;
  }

  public void setCategory(Category category) {
    this.category = category;
  }

  public List<String> getAuthors() {
    return this.authors;
  }

  public void setAuthors(List<String> authors) {
    this.authors = authors;
  }

  public List<String> getTags() {
    return this.tags;
  }

  public void setTags(List<String> tags) {
    this.tags = tags;
  }
}
