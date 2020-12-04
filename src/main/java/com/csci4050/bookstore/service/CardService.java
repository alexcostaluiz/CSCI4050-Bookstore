package com.csci4050.bookstore.service;

import com.csci4050.bookstore.dao.DAO;
import com.csci4050.bookstore.model.Card;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CardService {
  @Autowired private DAO<Card> dao;

  @Transactional
  public List<Card> get() {
    return dao.get();
  }

  @Transactional
  public Card get(int id) {
    return dao.get(id);
  }

  @Transactional
  public void save(Card card) {
    dao.save(card);
  }

  @Transactional
  public void delete(int id) {
    dao.delete(id);
  }
}
