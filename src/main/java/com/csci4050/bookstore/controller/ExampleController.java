package com.csci4050.bookstore.controller;

import com.csci4050.bookstore.model.Example;
import com.csci4050.bookstore.service.ExampleService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ExampleController {
  @Autowired private ExampleService exampleService;

  @GetMapping("/example")
  public List<Example> get() {
    return exampleService.get();
  }

  @PostMapping("/example")
  public Example save(@RequestBody Example example) {
    exampleService.save(example);
    return example;
  }

  @GetMapping("/example/{id}")
  public Example get(@PathVariable int id) {
    return exampleService.get(id);
  }

  @DeleteMapping("/example/{id}")
  public String delete(@PathVariable int id) {
    exampleService.delete(id);
    return "Deleted example with id " + id + ".";
  }

  @PutMapping("/example")
  public Example update(@RequestBody Example example) {
    exampleService.save(example);
    return example;
  }
}
