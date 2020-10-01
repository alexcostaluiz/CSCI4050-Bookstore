import './CartPage.less';

import React from 'react';

import { Breadcrumb, Col, Row, Typography } from 'antd';

import BookThumbnail from '../components/BookThumbnail.js';
import CartItem from '../components/CartItem.js';
import CartSummary from '../components/CartSummary.js';
import Section from '../components/Section.js';
import Slider from '../components/Slider.js';

const { Title } = Typography;

const book = {
  author: 'Barack Obama',
  edition: null,
  image: 'https://kottke.org/plus/misc/images/obama-promised-land-book.jpg',
  isbn: '978-1-524-76316-9',
  numRatings: 4132,
  pages: 768,
  price: 34.99,
  publicationDate: 1605589200,
  publisher: 'Crown Publishing Group',
  rating: 4.1,
  tags: ['Nonfiction', 'Biography', 'Autobiography', 'Bestseller'],
  title: 'A Promised Land',
};
const fcart = Array.from({ length: 3 }, (e) => book);

function CartPage(props) {
  const { cart = fcart } = props;

  return (
    <Row justify='center'>
      <Col span={24} className='bookstore-bp-column'>
        <Breadcrumb className='bookstore-cp-breadcrumb'>
          <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
          <Breadcrumb.Item href='#'>Cart</Breadcrumb.Item>
        </Breadcrumb>
        <div className='bookstore-cp-section'>
          <div className='bookstore-cart-list'>
            <Title className='bookstore-cart-list-title'>Cart</Title>
            {cart.map((b, i) => (
              <CartItem key={i} {...b} />
            ))}
          </div>
          <CartSummary cart={cart} />
        </div>
        <Section title='You Might Also Like'>
          <Slider itemWidth={216} spaceBetween={16}>
            {Array.from({ length: 8 }, (e, i) => (
              <BookThumbnail key={i} />
            ))}
          </Slider>
        </Section>
      </Col>
    </Row>
  );
}

export default CartPage;
