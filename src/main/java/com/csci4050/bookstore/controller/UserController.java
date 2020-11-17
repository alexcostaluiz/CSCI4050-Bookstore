package com.csci4050.bookstore.controller;

import com.csci4050.bookstore.model.User;
import com.csci4050.bookstore.service.UserService;
import java.util.Map;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired private UserService userService;

    @GetMapping("/get/{id}")
    public User getUser(@PathVariable int id) {
        return userService.get(id);
    }

    @GetMapping("/get")
    public List<User> getUsers() {
        return userService.get();
    }

    /**
     * Promote employee user
     *
     * @param user
     */
    @PostMapping(value = "/promote", consumes = "application/json", produces = "application/json")
    public void promoteUser(@RequestBody User user) {
        if (user.isEmployed() != true) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User is not an Employee.");
        }

    }

    /**
     * Demote employee user
     *
     * @param user
     */
    @PostMapping(value = "/demote", consumes = "application/json", produces = "application/json")
    public void demoteUser(@RequestBody User user) {
        if (user.isEmployed() != true) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User is not an Employee.");
        }

    }

    /**
     * Suspend user
     *
     * @param user
     */
    @PostMapping(value = "/suspend", consumes = "application/json", produces = "application/json")
    public void suspendUser(@RequestBody User user) {

    }

    /**
     * De-suspend user
     *
     * @param user
     */
    @PostMapping(value = "/desuspend", consumes = "application/json", produces = "application/json")
    public void deSuspendUser(@RequestBody User user) {

    }

}
