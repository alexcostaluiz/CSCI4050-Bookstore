package com.csci4050.bookstore.dao;

import com.csci4050.bookstore.model.Card;
import java.util.List;
import javax.persistence.EntityManager;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class CardDAO implements DAO<Card> {

  @Autowired private EntityManager entityManager;

  @Override
  public List<Card> get() {
    Session session = entityManager.unwrap(Session.class);
    Query<Card> query = session.createQuery("FROM card", Card.class);
    List<Card> cards = query.getResultList();
    return cards;
  }

  /* Return a single card */
  @Override
  public Card get(int id) {
    Session session = entityManager.unwrap(Session.class);
    Card card = session.get(Card.class, id);
    return card;
  }

  /* Save card */
  @Override
  public Integer save(Card card) {
    Session session = entityManager.unwrap(Session.class);
    return (Integer) session.save(card);
  }

  /* Delete a card */
  @Override
  public void delete(int id) {
    Session session = entityManager.unwrap(Session.class);
    Card card = session.get(Card.class, id);
    session.delete(card);
  }

  @Override
  public void update(Card card) {
    Session session = entityManager.unwrap(Session.class);
    session.update(card);
  }
}
