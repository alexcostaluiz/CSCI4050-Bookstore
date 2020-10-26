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
  @Column(name = "id")
  @NotNull
  private Integer id;

  @Column(name = "isbn")
  @NotNull
  private Integer isbn;

  @Column(name = "pub_year")
  @NotNull
  private Integer pubYear;

  @Column(name = "stock")
  @NotNull
  private Integer stock;

  @Column(name = "min_thresh")
  @NotNull
  private Integer minThresh;

  @Column(name = "buy_price")
  @NotNull
  private Double buyPrice;

  @Column(name = "sell_price")
  @NotNull
  private Double sellPrice;

  @Column(name = "title")
  @NotNull
  private String title;

  @Column(name = "cover_pic_path")
  @NotNull
  private String coverPicPath;

  @Column(name = "edition")
  @NotNull
  private String edition;

  @Column(name = "publisher")
  @NotNull
  private String publisher;

  @ElementCollection
  @Column(name = "category")
  @Enumerated(EnumType.STRING)
  @CollectionTable(name = "categories", joinColumns = @JoinColumn(name = "id"))
  private List<Category> categories;

  @Column(name = "author")
  @ElementCollection
  @CollectionTable(name = "authors", joinColumns = @JoinColumn(name = "id"))
  private List<String> authors;

  @Column(name = "tag")
  @ElementCollection
  @CollectionTable(name = "tags", joinColumns = @JoinColumn(name = "id"))
  private List<String> tags;

  public Book() {}

  public Book(
      int isbn,
      int pubYear,
      int stock,
      int minThresh,
      Double buyPrice,
      Double sellPrice,
      String title,
      String coverPicPath,
      String edition,
      String publisher,
      List<Category> categories,
      List<String> authors,
      List<String> tags) {
    this.isbn = isbn;
    this.pubYear = pubYear;
    this.stock = stock;
    this.minThresh = minThresh;
    this.buyPrice = buyPrice;
    this.sellPrice = sellPrice;
    this.title = title;
    this.coverPicPath = coverPicPath;
    this.edition = edition;
    this.publisher = publisher;
    this.categories = categories;
    this.authors = authors;
    this.tags = tags;
  }

  public Integer getId() {
    return this.id;
  }

  public Integer getIsbn() {
    return this.isbn;
  }

  public void setIsbn(Integer isbn) {
    this.isbn = isbn;
  }

  public Integer getPubYear() {
    return this.pubYear;
  }

  public void setPubYear(Integer pubYear) {
    this.pubYear = pubYear;
  }

  public Integer getStock() {
    return this.stock;
  }

  public void setStock(Integer stock) {
    this.stock = stock;
  }

  public Integer getMinThresh() {
    return this.minThresh;
  }

  public void setMinThresh(Integer minThresh) {
    this.minThresh = minThresh;
  }

  public Double getBuyPrice() {
    return this.buyPrice;
  }

  public void setBuyPrice(Double buyPrice) {
    this.buyPrice = buyPrice;
  }

  public Double getSellPrice() {
    return this.sellPrice;
  }

  public void setSellPrice(Double sellPrice) {
    this.sellPrice = sellPrice;
  }

  public String getTitle() {
    return this.title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getCoverPicPath() {
    return this.coverPicPath;
  }

  public void setCoverPicPath(String coverPicPath) {
    this.coverPicPath = coverPicPath;
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

  public List<Category> getCategories() {
    return this.categories;
  }

  public void setCategories(List<Category> categories) {
    this.categories = categories;
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

  @Override
  public boolean equals(Object o) {
    if (!(o instanceof Book)) {
      return false;
    }
    return this.id == ((Book) o).getId();
  }
}
