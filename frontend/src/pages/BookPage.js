import './BookPage.less';

import React from 'react';

import { Breadcrumb, Col, Image, Row } from 'antd';

import BookAuthorDetails from '../components/BookAuthorDetails.js';
import BookListing from '../components/BookListing.js';
import BookThumbnail from '../components/BookThumbnail.js';
import ReviewSection from '../components/ReviewSection.js';
import Section from '../components/Section.js';
import Slider from '../components/Slider.js';

/**
 * A page to display detailed information about one book.
 *
 * @param {string} props.author The author of this book.
 * @param {?string} props.edition The edition information of this book.
 * @param {string} props.image The path to the cover image of this book.
 * @param {string} props.isbn The ISBN-13 of this book.
 * @param {number} props.numRatings The number of ratings for this book.
 * @param {number} props.pages The number of pages in this book.
 * @param {number} props.price The selling price of this book.
 * @param {number} props.publicationDate The publication date of this book in UNIX Epoch
 *     Time (number of seconds that have elapsed since January 1, 1970 00:00:00 UTC).
 * @param {string} props.publisher The publisher of this book.
 * @param {number} props.rating The average rating of this book (out of 5).
 * @param {!Array<string>} props.tags Any tags associated with this book.
 * @param {string} props.title The title of this book.
 */
function BookPage(props) {
  const {
    author = 'Barack Obama',
    edition,
    image = 'https://kottke.org/plus/misc/images/obama-promised-land-book.jpg',
    isbn = '978-1-524-76316-9',
    numRatings = 4132,
    pages = 768,
    price = 34.99,
    publicationDate = 1605589200,
    publisher = 'Crown Publishing Group',
    rating = 4.1,
    tags = ['Nonfiction', 'Biography', 'Autobiography', 'Bestseller'],
    title = 'A Promised Land',
  } = props;

  return (
    <Row justify='center'>
      <Col span={24} className='bookstore-column'>
        <Breadcrumb className='bookstore-breadcrumb'>
          <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
          <Breadcrumb.Item href='/books'>Books</Breadcrumb.Item>
          <Breadcrumb.Item href='#'>{title}</Breadcrumb.Item>
        </Breadcrumb>
        <div className='bookstore-page-section'>
          <Image className='bookstore-bp-book-cover' src={image} />
          <BookListing
            author={author}
            edition={edition}
            image={image}
            numRatings={numRatings}
            price={price}
            rating={rating}
            title={title}
          />
        </div>
        <BookAuthorDetails
          author={author}
          edition={edition}
          isbn={isbn}
          pages={pages}
          publicationDate={publicationDate}
          publisher={publisher}
          tags={tags}
          {...props}
        />
        <ReviewSection />
        <Section title='Customers Who Bought This Item Also Bought'>
          <Slider itemWidth={216} spaceBetween={16}>
            {Array.from({ length: 8 }, (e, i) => (
              <BookThumbnail key={i} />
            ))}
          </Slider>
        </Section>
        <Section title='Your Recently Viewed Items'>
          <Slider itemWidth={216} spaceBetween={16}>
            {Array.from({ length: 4 }, (e, i) => (
              <BookThumbnail key={i} />
            ))}
          </Slider>
        </Section>
      </Col>
    </Row>
  );
}

export default BookPage;
