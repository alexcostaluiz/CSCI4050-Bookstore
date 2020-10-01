package com.csci4050.bookstore.dao;

import com.csci4050.bookstore.model.Book;
import java.util.List;
import javax.persistence.EntityManager;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class BookDAO implements DAO<Book> {
  @Autowired private EntityManager entityManager;

  @Override
  public List<Book> get() {
    Session session = entityManager.unwrap(Session.class);
    Query<Book> query = session.createQuery("FROM Book", Book.class);
    List<Book> books = query.getResultList();
    return books;
  }

  @Override
  public Book get(int id) {
    Session session = entityManager.unwrap(Session.class);
    Book book = session.get(Book.class, id);
    return book;
  }

  @Override
  public void save(Book book) {
    Session session = entityManager.unwrap(Session.class);
    session.saveOrUpdate(book);
  }

  @Override
  public void delete(int id) {
    Session session = entityManager.unwrap(Session.class);
    Book book = session.get(Book.class, id);
    session.delete(book);
  }
}
