package com.csci4050.bookstore.dao;

import java.util.List;

import javax.persistence.EntityManager;

import com.csci4050.bookstore.model.Author;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class AuthorDAO implements DAO<Author>{

    @Autowired private EntityManager entityManager;

    @Override
    public List<Author> get() {
      Session session = entityManager.unwrap(Session.class);
      Query<Author> query = session.createQuery("FROM author", Author.class);
      return query.getResultList();
    }
  
    @Override
    public Author get(int id) {
      Session session = entityManager.unwrap(Session.class);
      Author author = session.get(Author.class, id);
      return author;
    }
  
    @Override
    public Integer save(Author author) {
      Session session = entityManager.unwrap(Session.class);
      return (Integer) session.save(author);
    }
  
    @Override
    public void update(Author author) {
      Session session = entityManager.unwrap(Session.class);
      session.update(author);
    }
  
    @Override
    public void delete(int id) {
      Session session = entityManager.unwrap(Session.class);
      Author author = session.get(Author.class, id);
      session.delete(author);
    }
}
