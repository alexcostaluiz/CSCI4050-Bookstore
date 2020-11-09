package com.csci4050.bookstore.service;

import com.csci4050.bookstore.dao.AddressDAO;
import com.csci4050.bookstore.model.Address;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AddressService {
  @Autowired private AddressDAO dao;

  @Transactional
  public List<Address> get() {
    return dao.get();
  }

  @Transactional
  public Address get(int id) {
    return dao.get(id);
  }

  @Transactional
  public void save(Address address) {
    dao.save(address);
  }

  @Transactional
  public void delete(int id) {
    dao.delete(id);
  }
}
