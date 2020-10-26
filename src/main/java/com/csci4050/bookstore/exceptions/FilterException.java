package com.csci4050.bookstore.exceptions;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@ControllerAdvice
public class FilterException extends RuntimeException {

  private static final long serialVersionUID = 1L;

  @ExceptionHandler(value = FilterException.class)
  public ResponseEntity<Object> exception(FilterException e) {
    return new ResponseEntity<>("Filter string incorrect", HttpStatus.BAD_REQUEST);
  }
}