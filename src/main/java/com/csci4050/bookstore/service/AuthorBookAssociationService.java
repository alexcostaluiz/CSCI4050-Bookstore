package com.csci4050.bookstore.service;

import com.csci4050.bookstore.dao.AuthorBookAssociationDAO;
import com.csci4050.bookstore.model.AuthorBookAssociation;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthorBookAssociationService {
  @Autowired private AuthorBookAssociationDAO dao;

  @Transactional
  public List<AuthorBookAssociation> get() {
    return dao.get();
  }

  @Transactional
  public AuthorBookAssociation get(int id) {
    return dao.get(id);
  }

  @Transactional
  public void save(AuthorBookAssociation assoc) {
    dao.save(assoc);
  }

  @Transactional
  public void delete(int id) {
    dao.delete(id);
  }

  @Transactional
  public void update(AuthorBookAssociation assoc) {
    dao.update(assoc);
  }
}
