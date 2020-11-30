package com.csci4050.bookstore.dto;

import com.csci4050.bookstore.model.Book;

public class CartItemDto {
  private Book book;
  private Integer quantity;

  public Book getBook() {
    return this.book;
  }

  public void setBook(Book book) {
    this.book = book;
  }

  public Integer getQuantity() {
    return this.quantity;
  }

  public void setQuantity(Integer quantity) {
    this.quantity = quantity;
  }
}
