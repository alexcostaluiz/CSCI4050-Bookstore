package com.csci4050.bookstore.dao;

import com.csci4050.bookstore.model.Promotion;
import java.util.List;
import javax.persistence.EntityManager;
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
    Query<Promotion> query = session.createQuery("FROM promo", Promotion.class);
    List<Promotion> promos = query.getResultList();
    return promos;
  }

  @Override
  public Promotion get(int id) {
    Session session = entityManager.unwrap(Session.class);
    Promotion promo = session.get(Promotion.class, id);
    return promo;
  }

  @Override
  public Integer save(Promotion p) {
    Session session = entityManager.unwrap(Session.class);
    return (Integer) session.save(p);
  }

  @Override
  public void delete(int id) {
    Session session = entityManager.unwrap(Session.class);
    Promotion promo = session.get(Promotion.class, id);
    session.delete(promo);
  }

  @Override
  public void update(Promotion p) {
    Session session = entityManager.unwrap(Session.class);
    session.merge(p);
  }
}
