package com.csci4050.bookstore.dao;

import com.csci4050.bookstore.model.Order;
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
public class OrderDAO implements DAO<Order> {

  @Autowired private EntityManager entityManager;

  @Override
  public List<Order> get() {
    Session session = entityManager.unwrap(Session.class);
    Query<Order> query = session.createQuery("FROM order", Order.class);
    List<Order> orders = query.getResultList();
    return orders;
  }

  @Override
  public Order get(int id) {
    Session session = entityManager.unwrap(Session.class);
    Order order = session.get(Order.class, id);
    return order;
  }

  public List<Order> get(Map<String, String> filters)
      throws IllegalArgumentException, NoSuchFieldException {

    Session session = entityManager.unwrap(Session.class);

    // start building query
    CriteriaBuilder cb = session.getCriteriaBuilder();
    CriteriaQuery<Order> q = Filter.getQuery(filters, cb, Order.class);

    // custom filter
    Query<Order> query = session.createQuery(q);
    List<Order> orders = query.getResultList();
    return orders;
  }

  @Override
  public Integer save(Order order) {
    Session session = entityManager.unwrap(Session.class);
    return (Integer) session.save(order);
  }

  @Override
  public void delete(int id) {
    Session session = entityManager.unwrap(Session.class);
    Order order = session.get(Order.class, id);
    session.delete(order);
  }

  @Override
  public void update(Order order) {
    Session session = entityManager.unwrap(Session.class);
    session.update(order);
  }
}
