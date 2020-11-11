package com.csci4050.bookstore.service;

import com.csci4050.bookstore.dao.PromoDAO;
import com.csci4050.bookstore.model.Promotion;
import java.util.List;
import java.util.Map;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PromoService {

  @Autowired PromoDAO dao;

  @Transactional
  public List<Promotion> get() {
    return dao.get();
  }

  @Transactional
  public Promotion get(int id) {
    return dao.get(id);
  }

  @Transactional
  public List<Promotion> get(Map<String, String> filters)
      throws IllegalArgumentException, NoSuchFieldException {

    List<Promotion> books = dao.get(filters);
    return books;
  }

  @Transactional
  public void save(Promotion promo) {
    dao.save(promo);
  }

  @Transactional
  public void delete(Promotion promo) {
    dao.delete(promo.getId());
  }
}
