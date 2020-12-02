package com.csci4050.bookstore.service;

import com.csci4050.bookstore.dao.VerificationTokenDAO;
import com.csci4050.bookstore.model.VerificationToken;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TokenService {
  @Autowired private VerificationTokenDAO dao;

  @Transactional
  public List<VerificationToken> get() {
    return dao.get();
  }

  @Transactional
  public VerificationToken get(int id) {
    return dao.get(id);
  }

  @Transactional
  public VerificationToken get(String token) {
    return dao.findByToken(token);
  }

  @Transactional
  public void save(VerificationToken token) {
    dao.save(token);
  }

  @Transactional
  public void delete(int id) {
    dao.delete(id);
  }
}
