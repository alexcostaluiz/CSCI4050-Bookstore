package com.csci4050.bookstore.dao;

import com.csci4050.bookstore.model.User;
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
public class UserDAO implements DAO<User> {
  @Autowired private EntityManager entityManager;

  /* Return a list of users */
  @Override
  public List<User> get() {
    Session session = entityManager.unwrap(Session.class);
    Query<User> query = session.createQuery("FROM User", User.class);
    List<User> users = query.getResultList();
    return users;
  }

  /* Return a single user */
  @Override
  public User get(int id) {
    Session session = entityManager.unwrap(Session.class);
    User user = session.get(User.class, id);
    return user;
  }

  public User get(String email) {
    Session session = entityManager.unwrap(Session.class);
    CriteriaBuilder cb = session.getCriteriaBuilder();
    CriteriaQuery<User> q = cb.createQuery(User.class);
    Root<User> c = q.from(User.class);

    q.where(cb.equal(c.get("emailAddress"), email));

    Query<User> query = session.createQuery(q);
    User user = query.uniqueResult();

    return user;
  }

  /* Update user */
  @Override
  public void update(User user) {
    Session session = entityManager.unwrap(Session.class);
    session.update(user);
  }

  @Override
  public Integer save(User user) {
    Session session = entityManager.unwrap(Session.class);
    int id = (Integer) session.save(user);
    return id;
  }

  /* Delete a user */
  @Override
  public void delete(int id) {
    Session session = entityManager.unwrap(Session.class);
    User user = session.get(User.class, id);
    session.delete(user);
  }
}
