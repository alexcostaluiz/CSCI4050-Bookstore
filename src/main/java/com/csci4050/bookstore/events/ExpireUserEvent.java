package com.csci4050.bookstore.events;

import org.springframework.context.ApplicationEvent;

public class ExpireUserEvent extends ApplicationEvent {
  private static final long serialVersionUID = 78232132497L;
  private String email = null;

  public ExpireUserEvent(String email) {
    super(email);
    this.email = email;

  }

  public String getEmail() {
    return this.email;
  }
}
