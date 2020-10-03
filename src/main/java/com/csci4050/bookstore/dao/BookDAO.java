package com.csci4050.bookstore.dao;

import com.csci4050.bookstore.model.Book;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
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
  public List<Book> get(String orderBy) {
    Session session = entityManager.unwrap(Session.class);
    CriteriaBuilder cb = session.getCriteriaBuilder();
    CriteriaQuery<Book> q = cb.createQuery(Book.class);
    Root<Book> c = q.from(Book.class);
    if (orderBy != null && orderBy.matches("(\\+|\\-)+")) {
      if (orderBy.charAt(0) == '+') {
        q.select(c).orderBy(cb.asc(c.get(orderBy.substring(1))));
      } else {
        q.select(c).orderBy(cb.desc(c.get(orderBy.substring(1))));
      }
    }

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
