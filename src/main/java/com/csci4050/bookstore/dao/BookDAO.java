package com.csci4050.bookstore.dao;

import com.csci4050.bookstore.model.Book;
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
      for (int i = 0; i < filter.length; i++) {
        if (filter[i].equals(",")) {
          return cb.or(
              parseFilter(subarray(filter, 0, i), cb, c),
              parseFilter(subarray(filter, i + 1, filter.length), cb, c));
        }
      }

      for (int i = 0; i < filter.length; i++) {
        if (filter[i].equals(";")) {
          return cb.and(
              parseFilter(subarray(filter, 0, i), cb, c),
              parseFilter(subarray(filter, i + 1, filter.length), cb, c));
        }
      }

      try {
        return base(filter, cb, c);
      } catch (NoSuchFieldException e) {
        e.printStackTrace();
      }
    }
    throw new IllegalArgumentException();
  }

  private Predicate base(String[] filter, CriteriaBuilder cb, Root<Book> c)
      throws IllegalArgumentException, NoSuchFieldException {
    if (filter[1].equals(">")) {
      return cb.greaterThan(c.get(filter[0]).as(String.class), filter[2]);
    } else if (filter[1].equals(">=")) {
      return cb.greaterThanOrEqualTo(c.get(filter[0]).as(String.class), filter[2]);
    } else if (filter[1].equals("<")) {
      return cb.lessThan(c.get(filter[0]).as(String.class), filter[2]);
    } else if (filter[1].equals("<=")) {
      return cb.lessThanOrEqualTo(c.get(filter[0]).as(String.class), filter[2]);
    } else if (filter[1].equals("==")) {
      if (Collection.class.isAssignableFrom(Book.class.getDeclaredField(filter[0]).getType())) {
        return cb.isMember(filter[2], c.get(filter[0]));
      } else {
        return cb.equal(c.get(filter[0]).as(String.class), filter[2]);
      }

    } else if (filter[1].equals("!=")) {
      if (Collection.class.isAssignableFrom(Book.class.getDeclaredField(filter[0]).getType())) {
        return cb.isNotMember(filter[2], c.get(filter[0]));
      } else {
        return cb.notEqual(c.get(filter[0]).as(String.class), filter[2]);
      }
    } else {
      throw new IllegalArgumentException();
    }
  }
  /*
  private Predicate base(String[] filter, CriteriaBuilder cb, Root<Book> c, List<String> list) throws IllegalArgumentException {
    System.out.println(list);
    if(filter[1].equals("==")){
      return cb.isMember(list, c.get(filter[0]));
    } else if(filter[1].equals("!=")) {
      return cb.isNotMember(list, c.get(filter[0]));
    } else {
      throw new IllegalArgumentException();
    }
  }*/

  private String[] subarray(String[] arr, int beg, int end) {
    return Arrays.copyOfRange(arr, beg, end);
  }

  @Override
  public List<Book> get(Map<String, String> filters) {
    String orderBy = filters.get("orderBy");
    String filter = filters.get("filter");
    Session session = entityManager.unwrap(Session.class);
    CriteriaBuilder cb = session.getCriteriaBuilder();
    CriteriaQuery<Book> q = cb.createQuery(Book.class);
    Root<Book> c = q.from(Book.class);
    q.select(c);

    if (filter != null) {
      q.where(parseFilter(filter.split("\\s(?=([^\"]*\"[^\"]*\")*[^\"]*$)"), cb, c));
    }

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
