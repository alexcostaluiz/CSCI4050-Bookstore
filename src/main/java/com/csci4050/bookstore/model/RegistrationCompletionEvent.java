package com.csci4050.bookstore.model;

import java.util.Locale;
import org.springframework.context.ApplicationEvent;

public class RegistrationCompletionEvent extends ApplicationEvent {
  private String url;
  private Locale locale;
  private User user;

  public RegistrationCompletionEvent(User user, Locale locale, String url) {
    super(user);
    this.user = user;
    this.locale = locale;
    this.url = url;
  }

  public String getUrl() {
    return this.url;
  }

  private void setUrl(String url) {
    this.url = url;
  }

  public Locale getLocale() {
    return this.locale;
  }

  private void setLocale(Locale locale) {
    this.locale = locale;
  }

  public User getUser() {
    return this.user;
  }

  private void setUser(User user) {
    this.user = user;
  }
}
