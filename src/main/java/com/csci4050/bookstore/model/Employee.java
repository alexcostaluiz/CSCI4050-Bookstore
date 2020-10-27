package com.csci4050.bookstore.model;

import java.time.LocalDate;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "employee")
public class Employee {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  @NotNull
  private Integer id;

  @Column(name = "start_date")
  @NotNull
  private LocalDate startDate;

  @Column(name = "wage")
  @NotNull
  private Double wage;

  @Column(name = "weekly_hours")
  @NotNull
  private Double weeklyHours;
}
