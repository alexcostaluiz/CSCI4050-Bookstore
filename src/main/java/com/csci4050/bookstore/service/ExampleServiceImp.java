package com.csci4050.bookstore.service;

import com.csci4050.bookstore.dao.DAO;
import com.csci4050.bookstore.model.Example;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ExampleServiceImp implements ExampleService {
  @Autowired private DAO<Example> exampleDao;

  @Transactional
  @Override
  public List<Example> get() {
    return exampleDao.get();
  }

  @Transactional
  @Override
  public Example get(int id) {
    return exampleDao.get(id);
  }

  @Transactional
  @Override
  public void save(Example example) {
    exampleDao.save(example);
  }

  @Transactional
  @Override
  public void delete(int id) {
    exampleDao.delete(id);
  }
}
