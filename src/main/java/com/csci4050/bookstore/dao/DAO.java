package com.csci4050.bookstore.dao;

import com.csci4050.bookstore.model.Example;
import java.util.List;

public interface DAO<T> {
  List<T> get();

  T get(int id);

  void save(T t);

  void delete(int id);
}
