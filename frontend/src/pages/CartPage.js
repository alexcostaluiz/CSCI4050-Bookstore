import React, { useState, useEffect } from 'react';

import { Breadcrumb, Col, Row } from 'antd';

import BookThumbnail from '../components/BookThumbnail.js';
import CartList from '../components/CartList.js';
import CartSummary from '../components/CartSummary.js';
import Section from '../components/Section.js';
import Slider from '../components/Slider.js';
import DB from '../services/DatabaseService.js';

/**
 * The cart page. Allows users to review their selected products before checking out.
 */
function CartPage(props) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    (async () => {
      const books = await DB.retrieveBooks();
      setBooks(books.filter((b) => !b.archived));
    })();
  }, []);

  return (
    <Row justify='center'>
      <Col span={24} className='bookstore-column'>
        <Breadcrumb className='bookstore-breadcrumb'>
          <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
          <Breadcrumb.Item href='#'>Cart</Breadcrumb.Item>
        </Breadcrumb>
        <div className='bookstore-page-section'>
          <CartList />
          <CartSummary />
        </div>
        <Section title='You Might Also Like'>
          <Slider itemWidth={216} spaceBetween={16}>
            {books.slice(0, 15).map((b) => (
              <BookThumbnail key={b.id} book={b} />
            ))}
          </Slider>
        </Section>
        <Section title='Your Recently Viewed Items'>
          <Slider itemWidth={216} spaceBetween={16}>
            {books.slice(0, 4).map((b) => (
              <BookThumbnail key={b.id} book={b} />
            ))}
          </Slider>
        </Section>
      </Col>
    </Row>
  );
}

export default CartPage;
