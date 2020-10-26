package com.csci4050.bookstore.dao;

import java.util.List;
import java.util.Map;

public interface DAO<T> {
  List<T> get();

  T get(int id);

  void save(T t);

  List<T> get(Map<String, String> filters) throws NoSuchFieldException, IllegalArgumentException;

  void delete(int id);
}
