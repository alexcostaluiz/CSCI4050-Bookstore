package com.csci4050.bookstore.service;

import com.csci4050.bookstore.dao.UserDAO;
import com.csci4050.bookstore.dao.UserDetailsImp;
import com.csci4050.bookstore.model.User;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {

  @Autowired private UserDAO dao;

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    Optional<User> user = Optional.ofNullable(getUser(email));
    user.orElseThrow(() -> new UsernameNotFoundException("User not found"));
    UserDetails userDetails = user.map(UserDetailsImp::new).get();
    return userDetails;
  }

  @Transactional
  public User getUser(String email) {
    return dao.get(email);
  }

  @Transactional
  public List<User> get() {
    return dao.get();
  }

  @Transactional
  public User get(int id) {
    return dao.get(id);
  }

  @Transactional
  public List<User> getSubbed() {
    List<User> users = dao.get();
    return users.stream().filter(u -> u.getSubscription()).collect(Collectors.toList());
  }

  @Transactional
  public void createUser(User user) {
    BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
    user.setPassword(bcrypt.encode(user.getPassword()));
    dao.save(user);
  }

  @Transactional
  public void updateUser(User user) {
    dao.update(user);
  }

  @Transactional
  public void delete(int id) {
    dao.delete(id);
  }

  @Transactional
  public void delete(User user) {
    dao.delete(user.getId());
  }
}
