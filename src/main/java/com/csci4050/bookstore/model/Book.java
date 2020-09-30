package com.csci4050.bookstore.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.EnumType;
import javax.persistence.ElementCollection;
import javax.persistence.CollectionTable;
import javax.persistence.JoinColumn;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@Table(name = "book")
public class Book {

    private enum Category {
        Action, Art, Alternate_history, Autobiography, Anthology, Biography, Chick_lit, Business, Childrens, 
        Crafts, Classic, Cookbook, Comic_book, Diary, Coming_of_age, Dictionary, Crime, Encyclopedia, Drama, Guide, Fairytale, Health_and_fitness, 
        Fantasy, History, Graphic_novel, Home_and_garden, Historical_fiction, Humor, Horror, Journal, Mystery, Math, Paranormal_romance, Memoir, Picture_book, 
        Philosophy, Poetry, Prayer, Political_thriller, Religion, Romance, Textbook, Satire, True_crime, Science_fiction, Review, Short_story, 
        Science, Suspense, Self_help, Thriller, Sports_and_leisure, Western, Travel, Young_adult
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="book_id") 
    @NotNull
    private Integer book_id;


    @Column (name="isbn") @NotNull private Integer isbn;
    @Column(name="pub_year") @NotNull private Integer pub_year;
    @Column(name="stock") @NotNull private Integer stock;
    @Column(name="min_thresh") @NotNull private Integer min_thresh;
    @Column(name="buy_price") @NotNull private Float buy_price;
    @Column(name="sell_price") @NotNull private Float sell_price;
    @Column(name="title") @NotNull private String title;
    @Column(name="cover_pic_path") @NotNull private String cover_pic_path;
    @Column(name="edition") @NotNull private String edition;
    @Column(name="publisher") @NotNull private String publisher;

    @Column(name="category")
    @Enumerated(EnumType.STRING)
    private Category category;

    @ElementCollection
    @CollectionTable(name = "authors", joinColumns=@JoinColumn(name="book_id"))
    private List<String> authors;

    @ElementCollection
    @CollectionTable(name = "tags", joinColumns=@JoinColumn(name="book_id"))
    private List<String> tags;
}