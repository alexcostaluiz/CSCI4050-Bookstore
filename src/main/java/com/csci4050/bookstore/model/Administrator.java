package com.csci4050.bookstore.model;

import java.util.List;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.Table;
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

  /*  @ElementCollection
    @Column(name = "employees")
    @CollectionTable(name = "employees", joinColumns = @JoinColumn(name = "id"))
    private List<Employee> employees;
*/
    @ElementCollection
    @Column(name = "books")
    @CollectionTable(name = "books", joinColumns = @JoinColumn(name = "id"))
    private List<Book> books;

    @ElementCollection
    @Column(name = "promotions")
    @CollectionTable(name = "promotions", joinColumns = @JoinColumn(name = "id"))
    private List<Promotion> promotions;

    @ElementCollection
    @Column(name = "users")
    @CollectionTable(name = "users", joinColumns = @JoinColumn(name = "id"))
    private List<User> users;

}
