package com.csci4050.bookstore.controller;

import javax.annotation.Resource;

import com.csci4050.bookstore.dto.ReviewDto;
import com.csci4050.bookstore.model.Review;
import com.csci4050.bookstore.model.User;
import com.csci4050.bookstore.service.ReviewService;
import com.csci4050.bookstore.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

/**
 * Review controller for handling review creation.
 * Reviews are gotten on book return in book controller
 */
@RestController
@RequestMapping("/review")
public class ReviewController {

    @Resource(name = "authenticationManager") 
    AuthenticationManager authManager;

    @Autowired private ReviewService reviewService;
    @Autowired private UserService userService;

    @RequestMapping("/create")
    public void create(ReviewDto dto) {

        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth != null) {
                Object principal = auth.getPrincipal();
                if (principal instanceof UserDetails) {

                    User user = userService.getUser(((UserDetails) principal).getUsername());
                    dto.setUser(user);
                    Review review = Review.dtoToReview(dto);
                    reviewService.save(review);
                }
            }

            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "User not logged in.");
            
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Star number incorrect.");
        }
        
    }

    @RequestMapping("/delete")
    public void delete(ReviewDto dto) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth != null) {
                Object principal = auth.getPrincipal();
                if (principal instanceof UserDetails) {
                    User user = userService.getUser(((UserDetails) principal).getUsername());

                    //get existing review
                    Review review = reviewService.get(dto.getId());

                    if(review.getUser().getId() != user.getId()) {//check if review is owned by logged in user
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "This review belongs to another user.");
                    }

                    //delete review
                    reviewService.delete(dto.getId());
                }
            }

            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "User not logged in.");
        
    }

    @RequestMapping("/update")
    public void update(ReviewDto dto) {
        try {

            if(dto.getId() == null){
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Id must not be null.");
            }

            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth != null) {
                Object principal = auth.getPrincipal();
                if (principal instanceof UserDetails) {
                    //get currently logged in user
                    User user = userService.getUser(((UserDetails) principal).getUsername());

                    //get existing review
                    Review review = reviewService.get(dto.getId());

                    if(review.getUser().getId() != user.getId()) {//check if review is owned by logged in user
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "This review belongs to another user.");
                    }
                    //convert dto object and update
                    review = Review.dtoToReview(dto);
                    reviewService.update(review);
                }
            }

            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "User not logged in.");
            
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Star number incorrect.");
        }
        
    }
}