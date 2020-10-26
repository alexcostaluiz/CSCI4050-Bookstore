package com.csci4050.bookstore.dao;

import com.csci4050.bookstore.model.Book;
import com.csci4050.bookstore.util.Filter;
import java.util.List;
import java.util.Map;
import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
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
  public List<Book> get(Map<String, String> filters) {
    Session session = entityManager.unwrap(Session.class);

    // start building query
    CriteriaBuilder cb = session.getCriteriaBuilder();
    CriteriaQuery<Book> q = Filter.getQuery(filters, cb, Book.class);

    // custom filter
    Query<Book> query = session.createQuery(q);
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
