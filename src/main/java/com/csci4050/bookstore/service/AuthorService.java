package com.csci4050.bookstore.service;

import com.csci4050.bookstore.dao.DAO;
import com.csci4050.bookstore.model.Author;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthorService {
  @Autowired private DAO<Author> dao;

  @Transactional
  public List<Author> get() {
    return dao.get();
  }

  @Transactional
  public Author get(int id) {
    return dao.get(id);
  }

  @Transactional
  public Author get(String name) {
    List<Author> authors = dao.get();
    Optional<Author> author = authors.stream().filter(e -> e.getName().equals(name)).findFirst();
    return author.orElse(null);
  }

  @Transactional
  public Integer save(Author author) {
    return dao.save(author);
  }

  @Transactional
  public void delete(int id) {
    dao.delete(id);
  }

  @Transactional
  public void update(Author author) {
    dao.update(author);
  }
}
