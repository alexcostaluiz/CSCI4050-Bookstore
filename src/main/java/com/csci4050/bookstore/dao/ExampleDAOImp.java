package com.csci4050.bookstore.dao;

import com.csci4050.bookstore.model.Example;

import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.query.Query;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ExampleDAOImp implements ExampleDAO {
  @Autowired
  private EntityManager entityManager;

  @Override
  public List<Example> get() {
    Session session = entityManager.unwrap(Session.class);
    Query<Example> query = session.createQuery("FROM Example", Example.class);
    List<Example> examples = query.getResultList();
    return examples;
  }

  @Override
  public Example get(int id) {
    Session session = entityManager.unwrap(Session.class);
    Example example = session.get(Example.class, id);
    return example;
  }

  @Override
  public void save(Example example) {
    Session session = entityManager.unwrap(Session.class);
    session.saveOrUpdate(example);
  }

  @Override
  public void delete(int id) {
    Session session = entityManager.unwrap(Session.class);
    Example example = session.get(Example.class, id);
    session.delete(example);
  }
}
