package com.csci4050.bookstore.model;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

/* The following class was inspired by this baeldung tutorial
https://www.baeldung.com/registration-verify-user-by-email.
 */

@Entity
public class VerificationToken {
  private static final int EXPIRATION = 60 * 24;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  @Column(name = "token", unique = true)
  private String token;

  @ManyToOne(targetEntity = User.class, fetch = FetchType.EAGER)
  @JoinColumn(nullable = false, name = "user_id")
  private User user;

  private Date expirationDate;

  @Column(name = "type")
  @Enumerated(EnumType.STRING)
  private TokenType type;

  private Date createExpirationDate(int timeToExp) { // in mminutes
    Calendar cal = Calendar.getInstance();
    cal.setTime(new Timestamp(cal.getTime().getTime()));
    cal.add(Calendar.MINUTE, timeToExp);
    return new Date(cal.getTime().getTime());
  }

  public VerificationToken() {}

  public VerificationToken(String token, User user, TokenType type) {
    this.token = token;
    this.user = user;
    this.type = type;
    this.expirationDate = createExpirationDate(EXPIRATION);
  }

  public int getId() {
    return this.id;
  }

  public String getToken() {
    return this.token;
  }

  public void setToken(String token) {
    this.token = token;
  }

  public User getUser() {
    return this.user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public Date getExpirationDate() {
    return this.expirationDate;
  }

  public void setExpirationDate(Date expirationDate) {
    this.expirationDate = expirationDate;
  }

  public TokenType getType() {
    return this.type;
  }
}
