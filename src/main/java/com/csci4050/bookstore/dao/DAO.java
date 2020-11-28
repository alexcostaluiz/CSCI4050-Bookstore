package com.csci4050.bookstore.dao;

import java.util.List;

public interface DAO<T> {
  List<T> get();

  T get(int id);

  Integer save(T t);

  void delete(int id);

  void update(T t);
}
