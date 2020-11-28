package com.csci4050.bookstore.events;

import com.csci4050.bookstore.model.Order;
import com.csci4050.bookstore.model.User;
import org.springframework.context.ApplicationEvent;

public class OrderEvent extends ApplicationEvent {
  private static final long serialVersionUID = 799999123132497L;
  private Order order;
  private User user;

  public OrderEvent(Order order, User user) {
    super(user);
    this.order = order;
    this.user = user;
  }

  public Order getOrder() {
    return this.order;
  }

  public void setOrder(Order order) {
    this.order = order;
  }

  public User getUser() {
    return this.user;
  }

  public void setUser(User user) {
    this.user = user;
  }
}
