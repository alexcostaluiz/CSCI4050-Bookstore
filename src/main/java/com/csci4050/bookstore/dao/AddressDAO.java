package com.csci4050.bookstore.dao;

import com.csci4050.bookstore.model.Address;
import java.util.List;
import javax.persistence.EntityManager;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class AddressDAO implements DAO<Address> {

  @Autowired private EntityManager entityManager;

  @Override
  public List<Address> get() {
    Session session = entityManager.unwrap(Session.class);
    Query<Address> query = session.createQuery("FROM address", Address.class);
    List<Address> addresses = query.getResultList();
    return addresses;
  }

  /* Return a single address */
  @Override
  public Address get(int id) {
    Session session = entityManager.unwrap(Session.class);
    Address address = session.get(Address.class, id);
    return address;
  }

  /* Save address */
  @Override
  public void save(Address address) {
    Session session = entityManager.unwrap(Session.class);
    session.saveOrUpdate(address);
  }

  /* Delete an address */
  @Override
  public void delete(int id) {
    Session session = entityManager.unwrap(Session.class);
    Address address = session.get(Address.class, id);
    session.delete(address);
  }
}
