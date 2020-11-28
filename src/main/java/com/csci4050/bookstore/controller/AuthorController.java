package com.csci4050.bookstore.controller;

import java.util.List;

import com.csci4050.bookstore.model.Author;
import com.csci4050.bookstore.service.AuthorService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/authors")
public class AuthorController {

    @Autowired private AuthorService authorService;

    @GetMapping("/get/{id}")
    public Author getAuthor(@PathVariable int id) {
        return authorService.get(id);
    }

    @GetMapping("/get")
    public List<Author> getAuthors() {
        return authorService.get();
    }

    @PostMapping(value = "/create", consumes = "application/json", produces = "application/json")
    public void createAuthor(@RequestBody Author author) {
        try {
            authorService.save(author);
        } catch (DataIntegrityViolationException e) {
        e.printStackTrace();
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Contraint failed.");
        }
    }

    @PostMapping(value = "/update", consumes = "application/json", produces = "application/json")
    public void updateAuthor(@RequestBody Author author) {
        authorService.update(author);
    }
}
