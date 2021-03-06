package com.csci4050.bookstore.service;

import com.csci4050.bookstore.dao.AuthorDAO;
import com.csci4050.bookstore.model.Author;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthorService {
  @Autowired private AuthorDAO dao;

  @Transactional
  public List<Author> get() {
    return dao.get();
  }

  @Transactional
  public Author get(int id) {
    return dao.get(id);
  }

  @Transactional
  public void save(Author author) {
    dao.save(author);
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
