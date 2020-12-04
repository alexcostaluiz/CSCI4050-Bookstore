package com.csci4050.bookstore.dao;

import com.csci4050.bookstore.model.Promotion;

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
public class PromoDAO implements DAO<Promotion> {

  @Autowired private EntityManager entityManager;

  @Override
  public List<Promotion> get() {
    Session session = entityManager.unwrap(Session.class);
    Query<Promotion> query = session.createQuery("FROM Promotion", Promotion.class);
    List<Promotion> promos = query.getResultList();
    return promos;
  }

  @Override
  public Promotion get(int id) {
    Session session = entityManager.unwrap(Session.class);
    Promotion promo = session.get(Promotion.class, id);
    return promo;
  }

  public Promotion get(String code) {
    Session session = entityManager.unwrap(Session.class);
    CriteriaBuilder cb = session.getCriteriaBuilder();
    CriteriaQuery<Promotion> q = cb.createQuery(Promotion.class);
    Root<Promotion> c = q.from(Promotion.class);

    q.where(cb.equal(c.get("promoCode"), code));

    Query<Promotion> query = session.createQuery(q);
    Promotion promo = query.uniqueResult();

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
