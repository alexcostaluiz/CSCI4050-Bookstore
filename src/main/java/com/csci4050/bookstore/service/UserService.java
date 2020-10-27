package com.csci4050.bookstore.service;

import com.csci4050.bookstore.dao.UserDAO;
import com.csci4050.bookstore.model.User;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {
  @Autowired private UserDAO dao;

  @Transactional
  public List<User> get() {
    return dao.get();
  }

  @Transactional
  public User get(int id) {
    return dao.get(id);
  }

  @Transactional
  public void save(User user) {
    dao.save(user);
  }

  @Transactional
  public void delete(int id) {
    dao.delete(id);
  }

  @Transactional
  public void delete(User user) {
    dao.delete(user.getId());
  }
}
