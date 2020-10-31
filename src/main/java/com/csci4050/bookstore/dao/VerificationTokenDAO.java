package com.csci4050.bookstore.dao;

import com.csci4050.bookstore.model.VerificationToken;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public class VerificationTokenDAO implements DAO<VerificationToken> {
  @PersistenceContext private EntityManager entityManager;

  @Override
  public List<VerificationToken> get() {
    Session session = entityManager.unwrap(Session.class);
    Query<VerificationToken> query =
        session.createQuery("FROM VerificationToken", VerificationToken.class);
    List<VerificationToken> tokens = query.getResultList();
    return tokens;
  }

  @Override
  public VerificationToken get(int id) {
    Session session = entityManager.unwrap(Session.class);
    VerificationToken token = session.get(VerificationToken.class, id);
    return token;
  }

  @Override
  public void save(VerificationToken token) {
    Session session = entityManager.unwrap(Session.class);
    session.saveOrUpdate(token);
  }

  @Override
  public void delete(int id) {
    Session session = entityManager.unwrap(Session.class);
    VerificationToken token = session.get(VerificationToken.class, id);
    session.delete(token);
  }

  public VerificationToken findByToken(String token) {
    Session session = entityManager.unwrap(Session.class);
    VerificationToken desiredToken = session.get(VerificationToken.class, token);

    return desiredToken;
  }

  /* The following was suggested but I do not believe it is needed.
  public VerificationToken findByUser(User user) */
}
