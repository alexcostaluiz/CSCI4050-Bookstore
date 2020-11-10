package com.csci4050.bookstore.model;

public class PasswordDto {

  private String token;

  private String newPassword;

  private String oldPassword;

  public String getToken() {
    return this.token;
  }

  public String getNewPassword() {
    return this.newPassword;
  }

  public String getOldPassword() {
    return this.oldPassword;
  }
}
