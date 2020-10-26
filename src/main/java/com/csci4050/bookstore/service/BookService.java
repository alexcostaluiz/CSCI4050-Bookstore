package com.csci4050.bookstore.service;

import com.csci4050.bookstore.dao.DAO;
import com.csci4050.bookstore.model.Book;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BookService {
  @Autowired private DAO<Book> dao;

  @Transactional
  public List<Book> get() {
    return dao.get();
  }

  @Transactional
  public List<Book> get(Map<String, String> filters)
      throws IllegalArgumentException, NoSuchFieldException {

    List<Book> books = dao.get(filters);

    return books;
  }

  @Transactional
  public Book get(int id) {
    return dao.get(id);
  }

  @Transactional
  public void save(Book book) {
    dao.save(book);
  }

  @Transactional
  public void delete(int id) {
    dao.delete(id);
  }

  @Transactional
  public void delete(Book book) {
    dao.delete(book.getId());
  }
}
