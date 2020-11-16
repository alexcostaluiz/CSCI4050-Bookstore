package com.csci4050.bookstore.dao;

import com.csci4050.bookstore.model.ActivityStatus;
import com.csci4050.bookstore.model.Role;
import com.csci4050.bookstore.model.User;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class UserDetailsImp implements UserDetails {
  static final long serialVersionUID = 123L;
  private String email;
  private String password;
  private ActivityStatus status;
  private List<GrantedAuthority> authorities;

  public UserDetailsImp(User user) {
    this.email = user.getEmailAddress();
    this.password = user.getPassword();
    this.status = user.getStatus();

    List<String> roles = user.getRoles().stream().map(Role::name).collect(Collectors.toList());
    System.out.println(roles.toString());
    this.authorities = roles.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorities;
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return email;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return status != ActivityStatus.Suspended;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return status == ActivityStatus.Active;
  }
}
