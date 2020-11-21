package com.csci4050.bookstore.events;

import com.csci4050.bookstore.model.User;
import java.util.Locale;
import org.springframework.context.ApplicationEvent;

public class RegistrationCompletionEvent extends ApplicationEvent {
  private static final long serialVersionUID = 782349623547L;
  private String url;
  private Locale locale;
  private User user;
  private boolean saved;

  public RegistrationCompletionEvent(User user, Locale locale, String url, boolean saved) {
    super(user);
    this.user = user;
    this.locale = locale;
    this.url = url;
    this.saved = saved;
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

  public boolean isSaved() {
    return this.saved;
  }
}
