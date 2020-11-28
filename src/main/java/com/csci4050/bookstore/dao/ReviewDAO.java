package com.csci4050.bookstore.dao;

import java.util.List;
import javax.persistence.EntityManager;

import com.csci4050.bookstore.model.Review;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ReviewDAO implements DAO<Review> {

    @Autowired private EntityManager entityManager;

    @Override
    public List<Review> get() {
        Session session = entityManager.unwrap(Session.class);
        Query<Review> query = session.createQuery("FROM review", Review.class);
        return query.getResultList();
    }

    @Override
    public Review get(int id) {
        Session session = entityManager.unwrap(Session.class);
        return session.get(Review.class, id);
    }

    @Override
    public Integer save(Review review) {
        Session session = entityManager.unwrap(Session.class);
        return (Integer) session.save(review);
    }

    @Override
    public void delete(int id) {
        Session session = entityManager.unwrap(Session.class);
        Review review = session.get(Review.class, id);
        session.delete(review);

    }

    @Override
    public void update(Review review) {
        Session session = entityManager.unwrap(Session.class);
        session.update(review);
    }

}
