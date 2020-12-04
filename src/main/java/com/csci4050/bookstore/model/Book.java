package com.csci4050.bookstore.model;

import com.csci4050.bookstore.dto.AuthorDto;
import com.csci4050.bookstore.dto.BookDto;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
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
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "book")
public class Book {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Integer id;

  @Column(name = "isbn", nullable = false, unique = true)
  private String isbn;

  @Column(name = "pub_date", nullable = false)
  @JsonFormat(pattern = "yyyy-MM-dd")
  private LocalDate pubDate;

  @Column(name = "stock", nullable = false)
  private Integer stock;

  @Column(name = "min_thresh", nullable = false)
  private Integer minThresh;

  @Column(name = "buy_price", nullable = false)
  private Double buyPrice;

  @Column(name = "sell_price", nullable = false)
  private Double sellPrice;

  @Column(name = "title", nullable = false)
  private String title;

  @Column(name = "cover_pic", nullable = true, columnDefinition = "BLOB")
  @Lob
  private byte[] coverPic;

  @Column(name = "description", nullable = true, columnDefinition = "TEXT")
  private String description;

  @Column(name = "pages", nullable = false)
  private Integer pages;

  @Column(name = "edition", nullable = true)
  private String edition;

  @Column(name = "publisher", nullable = false)
  private String publisher;

  @Column(name = "archived", nullable = false)
  private boolean archived = false;

  @ManyToOne
  @JoinColumn(name = "promo_id", nullable = true)
  @JsonBackReference
  private Promotion promo;

  @ElementCollection
  @Column(name = "category")
  @Enumerated(EnumType.STRING)
  @CollectionTable(name = "categories", joinColumns = @JoinColumn(name = "id"))
  private List<Category> categories = new ArrayList<Category>();

  @OneToMany(mappedBy = "book")
  private List<AuthorBookAssociation> authors = new ArrayList<AuthorBookAssociation>();

  @Column(name = "tag")
  @ElementCollection
  @CollectionTable(name = "tags", joinColumns = @JoinColumn(name = "id"))
  private List<Tag> tags = new ArrayList<Tag>();

  @OneToMany(mappedBy = "book", cascade = CascadeType.ALL)
  private List<Review> reviews = new ArrayList<Review>();

  public Integer getId() {
    return this.id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getIsbn() {
    return this.isbn;
  }

  public void setIsbn(String isbn) {
    this.isbn = isbn;
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

  public List<AuthorBookAssociation> getAuthors() {
    return this.authors;
  }

  public void setAuthors(List<AuthorBookAssociation> authors) {
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

  @Override
  public boolean equals(Object o) {
    if (!(o instanceof Book)) {
      return false;
    }
    return this.id == ((Book) o).getId();
  }

  @Override
  public String toString() {
    return "title: " + this.title + "\nid: " + this.id;
  }

  public static Book dtoToBook(BookDto dto, Book book) {
    book.setId(dto.getId());
    book.setArchived(dto.getArchived());
    book.setBuyPrice(dto.getBuyPrice());
    book.setCategories(dto.getCategories());
    book.setCoverPic(dto.getCoverPic());
    book.setDescription(dto.getDescription());
    book.setEdition(dto.getEdition());
    book.setIsbn(dto.getIsbn());
    book.setMinThresh(dto.getMinThresh());
    book.setPages(dto.getPages());
    book.setPromo(dto.getPromo());
    book.setPubDate(dto.getPubDate());
    book.setPublisher(dto.getPublisher());
    book.setReviews(dto.getReviews());
    book.setSellPrice(dto.getSellPrice());
    book.setStock(dto.getStock());
    book.setTags(dto.getTags());
    book.setTitle(dto.getTitle());
    List<AuthorBookAssociation> list = book.getAuthors();
    for (AuthorDto authorDto : dto.getAuthors()) {
      Author author = new Author();
      author.setName(authorDto.getName());

      AuthorBookAssociation assoc = new AuthorBookAssociation();
      assoc.setRole(authorDto.getRole());
      assoc.setAuthor(author);
      assoc.setBook(book);

      list.add(assoc);
    }
    book.setAuthors(list);

    return book;
  }

  public static BookDto bookToDto(Book book) {
    BookDto dto = new BookDto();
    dto.setId(book.getId());
    dto.setArchived(book.isArchived());
    dto.setBuyPrice(book.getBuyPrice());
    dto.setCategories(book.getCategories());
    dto.setCoverPic(book.getCoverPic());
    dto.setDescription(book.getDescription());
    dto.setEdition(book.getEdition());
    dto.setIsbn(book.getIsbn());
    dto.setMinThresh(book.getMinThresh());
    dto.setPages(book.getPages());
    dto.setPromo(book.getPromo());
    dto.setPubDate(book.getPubDate());
    dto.setPublisher(book.getPublisher());
    dto.setReviews(book.getReviews());
    dto.setSellPrice(book.getSellPrice());
    dto.setStock(book.getStock());
    dto.setTags(book.getTags());
    dto.setTitle(book.getTitle());
    List<AuthorDto> list = dto.getAuthors();
    for (AuthorBookAssociation assoc : book.getAuthors()) {

      AuthorDto authorDto = new AuthorDto();
      authorDto.setName(assoc.getAuthor().getName());
      authorDto.setRole(assoc.getRole());

      list.add(authorDto);
    }

    dto.setAuthors(list);
    return dto;
  }
}
