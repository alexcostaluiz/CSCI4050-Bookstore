package com.csci4050.bookstore.dao;

import com.csci4050.bookstore.model.Example;

import java.util.List;

public interface ExampleDAO {
  List<Example> get();

  Example get(int id);

  void save(Example example);

  void delete(int id);
}
