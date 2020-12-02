package com.csci4050.bookstore.dto;

import com.csci4050.bookstore.model.Category;
import com.csci4050.bookstore.model.Promotion;
import com.csci4050.bookstore.model.Review;
import com.csci4050.bookstore.model.Tag;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Lob;

public class BookDto {

  private Integer id;

  @JsonFormat(pattern = "yyyy-MM-dd")
  private LocalDate pubDate;

  private String isbn;
  private Integer stock;
  private Integer minThresh;
  private Double buyPrice;
  private Double sellPrice;
  private String title;

  @Lob private byte[] coverPic;

  private String description;
  private Integer pages;
  private String edition;
  private String publisher;
  private boolean archived = false;
  private Promotion promo;
  private List<Category> categories = new ArrayList<Category>();
  private List<AuthorDto> authors = new ArrayList<AuthorDto>();
  private List<Tag> tags = new ArrayList<Tag>();
  private List<Review> reviews = new ArrayList<Review>();

  public String getIsbn() {
    return this.isbn;
  }

  public void setIsbn(String isbn) {
    this.isbn = isbn;
  }

  public Integer getId() {
    return this.id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public LocalDate getPubDate() {
    return this.pubDate;
  }

  public void setPubDate(LocalDate pubDate) {
    this.pubDate = pubDate;
  }

  public boolean isArchived() {
    return archived;
  }

  public void setArchived(boolean archived) {
    this.archived = archived;
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

  public byte[] getCoverPic() {
    return this.coverPic;
  }

  public void setCoverPic(byte[] coverPic) {
    this.coverPic = coverPic;
  }

  public String getDescription() {
    return this.description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Integer getPages() {
    return this.pages;
  }

  public void setPages(Integer pages) {
    this.pages = pages;
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

  public List<AuthorDto> getAuthors() {
    return this.authors;
  }

  public void setAuthors(List<AuthorDto> authors) {
    this.authors = authors;
  }

  public List<Tag> getTags() {
    return this.tags;
  }

  public void setTags(List<Tag> tags) {
    this.tags = tags;
  }

  public void setPromo(Promotion promo) {
    this.promo = promo;
  }

  public Promotion getPromo() {
    return this.promo;
  }

  public List<Review> getReviews() {
    return this.reviews;
  }

  public void setReviews(List<Review> reviews) {
    this.reviews = reviews;
  }

  public boolean getArchived() {
    return this.archived;
  }
}
