package com.csci4050.bookstore.service;

import com.csci4050.bookstore.dao.UserDAO;
import com.csci4050.bookstore.model.RegisteredUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RegisterService {
  @Autowired private UserDAO dao;

  /* Registers the user in the database from a JSON representation */
  public void register(RegisteredUser user) {
    user.setPassword(encrypt(user.getPassword()));
    dao.save(user);
  }

  public String encrypt(String key) {
    return new String();
  }
}
