package com.csci4050.bookstore.model;

import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.JoinTable;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "administrator")
public class Administrator extends User {

  @Column(name = "first_name")
  @NotNull
  private String firstName;

  @Column(name = "last_name")
  @NotNull
  private String lastName;

  @Column(name = "password")
  @NotNull
  private String password;

  @ManyToMany
  @JoinTable(
    name = "admin_employees", 
    joinColumns = @JoinColumn(name = "admin_id"))
  private List<Employee> employees;
  
  @ManyToMany
  @JoinTable(
    name = "admin_books", 
    joinColumns = @JoinColumn(name = "admin_id"))
  private List<Book> books;

  @ManyToMany
  @JoinTable(
    name = "admin_promos", 
    joinColumns = @JoinColumn(name = "admin_id"))
  private List<Promotion> promotions;

  @ManyToMany
  @JoinTable(
    name = "admin_users", 
    joinColumns = @JoinColumn(name = "admin_id"))
  private List<User> users;
}
