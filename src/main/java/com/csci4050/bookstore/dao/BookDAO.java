package com.csci4050.bookstore.dao;

import com.csci4050.bookstore.model.Book;
import com.csci4050.bookstore.model.Category;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
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

  private Predicate parseFilter(String[] filter, CriteriaBuilder cb, Root<Book> c)
      throws IllegalArgumentException {
    for (int i = 0; i < filter.length; i++) {
      filter[i] = filter[i].replaceAll("^\"|\"$", "");
    }
    if (filter.length > 0) {

      // OR operator
      for (int i = 0; i < filter.length; i++) {
        if (filter[i].equals(",")) {
          return cb.or(
              parseFilter(Arrays.copyOfRange(filter, 0, i), cb, c),
              parseFilter(Arrays.copyOfRange(filter, i + 1, filter.length), cb, c));
        }
      }

      // AND operator
      for (int i = 0; i < filter.length; i++) {
        if (filter[i].equals(";")) {
          return cb.and(
              parseFilter(Arrays.copyOfRange(filter, 0, i), cb, c),
              parseFilter(Arrays.copyOfRange(filter, i + 1, filter.length), cb, c));
        }
      }

      try {
        // base case
        return base(filter, cb, c);
      } catch (NoSuchFieldException e) {
        e.printStackTrace();
      }
    }
    throw new IllegalArgumentException();
  }

  private Predicate base(String[] filter, CriteriaBuilder cb, Root<Book> c)
      throws IllegalArgumentException, NoSuchFieldException {
    Object value = filter[2];

    // convert types that arent string/number
    switch (filter[0]) {
      case "categories":
        value = Category.valueOf(filter[2]);
        break;
    }

    // base case
    if (filter[1].equals(">")) {
      return cb.greaterThan(c.get(filter[0]).as(String.class), (String) value);
    } else if (filter[1].equals(">=")) {
      return cb.greaterThanOrEqualTo(c.get(filter[0]).as(String.class), (String) value);
    } else if (filter[1].equals("<")) {
      return cb.lessThan(c.get(filter[0]).as(String.class), (String) value);
    } else if (filter[1].equals("<=")) {
      return cb.lessThanOrEqualTo(c.get(filter[0]).as(String.class), (String) value);
    } else if (filter[1].equals("==")) {
      // check if attribute returns list
      if (Collection.class.isAssignableFrom(Book.class.getDeclaredField(filter[0]).getType())) {
        return cb.isMember(value, c.get(filter[0]));
      } else {
        return cb.equal(c.get(filter[0]).as(String.class), (String) value);
      }

    } else if (filter[1].equals("!=")) {
      // check if attribute returns list
      if (Collection.class.isAssignableFrom(Book.class.getDeclaredField(filter[0]).getType())) {
        return cb.isNotMember(value, c.get(filter[0]));
      } else {
        return cb.notEqual(c.get(filter[0]).as(String.class), (String) value);
      }
    } else {
      throw new IllegalArgumentException();
    }
  }

  @Override
  public List<Book> get(Map<String, String> filters) {
    String orderBy = filters.get("orderBy");
    String filter = filters.get("filter");
    Session session = entityManager.unwrap(Session.class);

    // start building query
    CriteriaBuilder cb = session.getCriteriaBuilder();
    CriteriaQuery<Book> q = cb.createQuery(Book.class);
    Root<Book> c = q.from(Book.class);
    q.select(c);

    // custom filter
    if (filter != null) {
      // string is split by space, but quoted entries are kept in tact
      q.where(parseFilter(filter.split("\\s(?=([^\"]*\"[^\"]*\")*[^\"]*$)"), cb, c));
    }

    // orders query
    if (orderBy != null && orderBy.matches("(\\+|\\-)\\w+")) {
      if (orderBy.charAt(0) == '+') {
        q.orderBy(cb.asc(c.get(orderBy.substring(1))));
      } else {
        q.orderBy(cb.desc(c.get(orderBy.substring(1))));
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
