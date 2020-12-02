package com.csci4050.bookstore.service;

import com.csci4050.bookstore.dao.OrderDAO;
import com.csci4050.bookstore.model.Order;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {
  @Autowired private OrderDAO dao;

  @Transactional
  public List<Order> get() {
    return dao.get();
  }

  @Transactional
  public Order get(int id) {
    return dao.get(id);
  }

  @Transactional
  public Integer save(Order order) {
    return dao.save(order);
  }

  @Transactional
  public void delete(int id) {
    dao.delete(id);
  }

  @Transactional
  public void update(Order Order) {
    dao.update(Order);
  }
}
