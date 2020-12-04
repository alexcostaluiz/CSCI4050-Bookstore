package com.csci4050.bookstore.dao;

import com.csci4050.bookstore.model.AuthorBookAssociation;
import java.util.List;
import javax.persistence.EntityManager;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class AuthorBookAssociationDAO implements DAO<AuthorBookAssociation> {

  @Autowired private EntityManager entityManager;

  @Override
  public List<AuthorBookAssociation> get() {
    Session session = entityManager.unwrap(Session.class);
    Query<AuthorBookAssociation> query =
        session.createQuery("FROM author_book_association", AuthorBookAssociation.class);
    return query.getResultList();
  }

  @Override
  public AuthorBookAssociation get(int id) {
    Session session = entityManager.unwrap(Session.class);
    AuthorBookAssociation assoc = session.get(AuthorBookAssociation.class, id);
    return assoc;
  }

  @Override
  public Integer save(AuthorBookAssociation assoc) {
    Session session = entityManager.unwrap(Session.class);
    return (Integer) session.save(assoc);
  }

  @Override
  public void delete(int id) {
    Session session = entityManager.unwrap(Session.class);
    AuthorBookAssociation assoc = session.get(AuthorBookAssociation.class, id);
    session.delete(assoc);
  }

  @Override
  public void update(AuthorBookAssociation assoc) {
    Session session = entityManager.unwrap(Session.class);
    session.update(assoc);
  }
}
