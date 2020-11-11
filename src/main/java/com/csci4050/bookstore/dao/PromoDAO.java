package com.csci4050.bookstore.dao;

import com.csci4050.bookstore.model.Promotion;
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
public class PromoDAO implements DAO<Promotion> {

  @Autowired private EntityManager entityManager;

  @Override
  public List<Promotion> get() {
    Session session = entityManager.unwrap(Session.class);
    Query<Promotion> query = session.createQuery("FROM card", Promotion.class);
    List<Promotion> promos = query.getResultList();
    return promos;
  }

  @Override
  public Promotion get(int id) {
    Session session = entityManager.unwrap(Session.class);
    Promotion promo = session.get(Promotion.class, id);
    return promo;
  }

  public List<Promotion> get(Map<String, String> filters)
      throws IllegalArgumentException, NoSuchFieldException {
    Session session = entityManager.unwrap(Session.class);

    // start building query
    CriteriaBuilder cb = session.getCriteriaBuilder();
    CriteriaQuery<Promotion> q = Filter.getQuery(filters, cb, Promotion.class);

    // custom filter
    Query<Promotion> query = session.createQuery(q);
    List<Promotion> books = query.getResultList();
    return books;
  }

  @Override
  public void save(Promotion p) {
    Session session = entityManager.unwrap(Session.class);
    session.save(p);
  }

  @Override
  public void delete(int id) {
    Session session = entityManager.unwrap(Session.class);
    Promotion promo = session.get(Promotion.class, id);
    session.delete(promo);
  }
}
