package com.csci4050.bookstore.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "address")
public class Address {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  @NotNull
  private Integer id;

  @OneToOne(mappedBy = "address")
  @NotNull
  private RegisteredUser user;

  @Column(name = "street_num")
  private Integer streetNum;

  @Column(name = "street_name")
  private String streetName;

  @Column(name = "apt_num")
  private Integer aptNum;

  @Column(name = "city")
  private String city;

  @Column(name = "state")
  private String state;

  @Column(name = "zip")
  private Integer zip;

  @Column(name = "po_box")
  private Integer POBox;

  public Integer getId() {
    return this.id;
  }

  public Integer getStreetNum() {
    return this.streetNum;
  }

  public void setStreetNum(Integer streetNum) {
    this.streetNum = streetNum;
  }

  public String getStreetName() {
    return this.streetName;
  }

  public void setStreetName(String streetName) {
    this.streetName = streetName;
  }

  public Integer getAptNum() {
    return this.aptNum;
  }

  public void setAptNum(Integer aptNum) {
    this.aptNum = aptNum;
  }

  public String getCity() {
    return this.city;
  }

  public void setCity(String city) {
    this.city = city;
  }

  public String getState() {
    return this.state;
  }

  public void setState(String state) {
    this.state = state;
  }

  public Integer getZip() {
    return this.zip;
  }

  public void setZip(Integer zip) {
    this.zip = zip;
  }

  public Integer getPOBox() {
    return this.POBox;
  }

  public void setPOBox(Integer POBox) {
    this.POBox = POBox;
  }
}
