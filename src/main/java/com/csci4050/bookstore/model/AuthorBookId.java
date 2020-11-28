package com.csci4050.bookstore.model;

import java.io.Serializable;
import java.util.Objects;

public class AuthorBookId implements Serializable {


    private static final long serialVersionUID = 1323L;
    private Integer author;
    private Integer book;

    public Integer getAuthor() {
        return this.author;
    }

    public void setAuthor(Integer author) {
        this.author = author;
    }

    public Integer getBook() {
        return this.book;
    }

    public void setBook(Integer book) {
        this.book = book;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof AuthorBookId)) {
            return false;
        }
        AuthorBookId authorBook = (AuthorBookId) o;
        return author == authorBook.author && book == authorBook.book;
    }

    @Override
    public int hashCode() {
        return Objects.hash(author, book);
    }

    
}
