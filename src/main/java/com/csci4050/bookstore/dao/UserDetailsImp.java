package com.csci4050.bookstore.dao;

import com.csci4050.bookstore.model.ActivityStatus;
import com.csci4050.bookstore.model.User;
import java.util.Arrays;
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
    this.authorities =
        Arrays.stream(user.getRoles().toArray(new String[user.getRoles().size()]))
            .map(SimpleGrantedAuthority::new)
            .collect(Collectors.toList());
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
    return status == ActivityStatus.Inactive;
  }

  @Override
  public boolean isAccountNonLocked() {
    return status == ActivityStatus.Active;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return (status == ActivityStatus.Active || status == ActivityStatus.Suspended);
  }
}
