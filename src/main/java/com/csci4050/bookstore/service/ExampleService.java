package com.csci4050.bookstore.service;

import com.csci4050.bookstore.model.Example;

import java.util.List;

public interface ExampleService {
  List<Example> get();

  Example get(int id);

  void save(Example example);

  void delete(int id);
}
