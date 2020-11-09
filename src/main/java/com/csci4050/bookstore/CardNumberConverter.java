package com.csci4050.bookstore;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import org.springframework.security.crypto.encrypt.Encryptors;
import org.springframework.security.crypto.encrypt.TextEncryptor;
import org.springframework.security.crypto.keygen.KeyGenerators;

@Converter
public class CardNumberConverter implements AttributeConverter<String, String> {
  String salt = "73616c74";//KeyGenerators.string().generateKey();
  TextEncryptor enc = Encryptors.text("password", salt);

  @Override
  public String convertToDatabaseColumn(String attribute) {
    return enc.encrypt(attribute);
  }

  @Override
  public String convertToEntityAttribute(String dbData) {
    return enc.decrypt(dbData);
  }
}
