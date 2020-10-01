import './CartPage.less';

import React from 'react';

import { Breadcrumb, Col, Row, Typography } from 'antd';

import BookThumbnail from '../components/BookThumbnail.js';
import CartItem from '../components/CartItem.js';
import CartSummary from '../components/CartSummary.js';
import Section from '../components/Section.js';
import Slider from '../components/Slider.js';

const { Title } = Typography;

function CartPage(props) {
  const { cart } = props;

  return (
    <Row justify='center'>
      <Col span={24} className='bookstore-column'>
        <Breadcrumb className='bookstore-breadcrumb'>
          <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
          <Breadcrumb.Item href='#'>Cart</Breadcrumb.Item>
        </Breadcrumb>
        <div className='bookstore-page-section'>
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
