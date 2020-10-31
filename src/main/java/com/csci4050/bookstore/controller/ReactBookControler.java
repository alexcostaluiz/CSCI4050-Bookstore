package com.csci4050.bookstore.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping("/b")
public class ReactBookControler {

  @RequestMapping(method = RequestMethod.GET, path = "/{id}")
  public ModelAndView book(@PathVariable String id) {
    ModelAndView model = new ModelAndView();
    model.setViewName("index");
    return model;
  }
}
