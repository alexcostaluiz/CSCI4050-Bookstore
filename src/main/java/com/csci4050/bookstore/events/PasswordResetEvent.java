package com.csci4050.bookstore.events;

import com.csci4050.bookstore.model.User;
import java.util.Locale;
import org.springframework.context.ApplicationEvent;

public class PasswordResetEvent extends ApplicationEvent {
  private static final long serialVersionUID = 782349623547L;
  private String url;
  private Locale locale;
  private User user;

  public PasswordResetEvent(User user, Locale locale, String url) {
    super(user);
    this.user = user;
    this.locale = locale;
    this.url = url;
  }

  public String getUrl() {
    return this.url;
  }

  public Locale getLocale() {
    return this.locale;
  }

  public User getUser() {
    return this.user;
  }
}
