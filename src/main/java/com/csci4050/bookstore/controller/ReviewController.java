package com.csci4050.bookstore.controller;

import com.csci4050.bookstore.dto.ReviewDto;
import com.csci4050.bookstore.model.Review;
import com.csci4050.bookstore.service.ReviewService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    @Autowired private ReviewService reviewService;

    @RequestMapping("/create")
    public void create(ReviewDto dto) {

        try {
            Review review = Review.dtoToReview(dto);
            reviewService.save(review);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Star number incorrect.");
        }
        
    }

    @RequestMapping("/delete")
    public void delete(ReviewDto dto) {
        reviewService.delete(dto.getId());
    }

    @RequestMapping("/update")
    public void update(ReviewDto dto) {
        try {
            Review review = Review.dtoToReview(dto);
            reviewService.update(review);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Star number incorrect.");
        }
        
    }
}