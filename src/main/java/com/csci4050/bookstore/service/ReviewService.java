package com.csci4050.bookstore.service;

import com.csci4050.bookstore.dao.ReviewDAO;
import com.csci4050.bookstore.model.Review;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReviewService {
  @Autowired private ReviewDAO dao;

  @Transactional
  public List<Review> get() {
    return dao.get();
  }

  @Transactional
  public Review get(int id) {
    return dao.get(id);
  }

  @Transactional
  public void save(Review review) {
    dao.save(review);
  }

  @Transactional
  public void delete(int id) {
    dao.delete(id);
  }

  @Transactional
  public void update(Review review) {
    dao.update(review);
  }
}
