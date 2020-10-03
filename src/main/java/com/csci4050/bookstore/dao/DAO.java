package com.csci4050.bookstore.dao;

import java.util.List;

public interface DAO<T> {
  List<T> get();

  T get(int id);

  void save(T t);

  List<T> get(String orderBy);

  void delete(int id);
}
