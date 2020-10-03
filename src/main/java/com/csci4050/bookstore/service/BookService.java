package com.csci4050.bookstore.service;

import com.csci4050.bookstore.dao.DAO;
import com.csci4050.bookstore.model.Book;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.expression.Expression;
import org.springframework.expression.ExpressionParser;
import org.springframework.expression.spel.SpelEvaluationException;
import org.springframework.expression.spel.standard.SpelExpressionParser;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BookService {
  @Autowired private DAO<Book> dao;

  @Transactional
  public List<Book> get() {
    return dao.get();
  }

  @Transactional
  public List<Book> get(Map<String, String> filters) throws SpelEvaluationException {
    String filter = filters.get("filter");
    System.out.println(filter);
    String orderBy = filters.get("orderBy");
    List<Book> books = dao.get(orderBy);

    if (filter != null) {

      ExpressionParser parser = new SpelExpressionParser();
      Expression exp = parser.parseExpression(filter);
      books =
          books.stream()
              .filter(
                  book -> {
                    return exp.getValue(book, Boolean.class);
                  })
              .collect(Collectors.toList());
    }

    return books;
  }

  @Transactional
  public Book get(int id) {
    return dao.get(id);
  }

  @Transactional
  public void save(Book book) {
    dao.save(book);
  }

  @Transactional
  public void delete(int id) {
    dao.delete(id);
  }
}
