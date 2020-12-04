import './BookPage.less';

import React, { useState, useEffect } from 'react';

import { useLocation } from 'react-router-dom';

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
 * @param {!Book} props.book The book whose information should be displayed in this page.
 */
function BookPage(props) {
  const [book, setBook] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchBook = async (id) => {
    await fetch('/books/get/' + id)
      .then((response) => response.json())
      .then((data) => {
        if (data.coverPic == null) {
          data.coverPic = 'https://i.stack.imgur.com/1hvpD.jpg';
        } else {
          data.coverPic = 'data:image/*;base64,' + data.coverPic;
        }
        setBook(data);
      });
  };

  fetchBook(useLocation().pathname.substr(3));

  useEffect(() => {
    if (book !== null) {
      setIsLoaded(true);
    }
  }, [book]);

  if (!isLoaded) {
    return <div></div>;
  } else {
    const { coverPic, title } = book;

    return (
      <Row justify='center'>
        <Col span={24} className='bookstore-column'>
          <Breadcrumb className='bookstore-breadcrumb'>
            <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
            <Breadcrumb.Item href='/books'>Books</Breadcrumb.Item>
            <Breadcrumb.Item href='#'>{title}</Breadcrumb.Item>
          </Breadcrumb>
          <div className='bookstore-page-section'>
            <Image className='bookstore-bp-book-cover' src={coverPic} />
            <BookListing book={book} />
          </div>
          <BookAuthorDetails book={book} />
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
}

export default BookPage;
