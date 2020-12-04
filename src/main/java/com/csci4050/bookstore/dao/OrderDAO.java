package com.csci4050.bookstore.dao;

import com.csci4050.bookstore.model.Order;
import java.util.List;
import javax.persistence.EntityManager;
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
