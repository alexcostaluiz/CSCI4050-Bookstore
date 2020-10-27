package com.csci4050.bookstore.dao;

import com.csci4050.bookstore.model.User;
import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserDAO implements DAO <User> {
    @Autowired private EntityManager entityManager;

    /* Return a list of users */
    @Override
    public List<User> get() {
        Session session = entityManager.unwrap(Session.class);
        Query<User> query = session.createQuery("FROM user", User.class);
        List<User> users = query.getResultList();
        return users;
    }

    /* Return a single user */
    @Override
    public User get(id) {
        Session session = entityManager.unwrap(Session.class);
        User user = session.get(User.class, id);
        return user;
    }

    /* Save user */
    @Override
    public void save(User user) {
        Session session = entityManager.unwrap(Session.class);
        session.saveOrUpdate(user);
    }

    /* Delete a user */
    @Override
    public void delete(int id) {
        Session session = entityManager.unwrap(Session.class);
        User user = session.get(User.class, id);
        session.delete(user);
    }

}