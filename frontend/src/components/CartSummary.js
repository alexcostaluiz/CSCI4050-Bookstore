import './CartSummary.less';

import React from 'react';

import { Button, Divider, Typography } from 'antd';

const { Paragraph, Title } = Typography;

function CartSummary(props) {
  const { cart } = props;

  const subtotal = cart.reduce((a, b) => a + b.price, 0);
  const tax = 4.99;
  const total = subtotal + tax;

  return (
    <div className='bookstore-cart-summary-wrapper'>
      <Title className='bookstore-cart-summary-title'>Order Summary</Title>
      <div className='bookstore-cart-summary'>
        <div className='bookstore-cart-summary-row'>
          <Paragraph>Subtotal ({cart.length} items)</Paragraph>
          <Paragraph>${subtotal}</Paragraph>
        </div>
        <div className='bookstore-cart-summary-row'>
          <Paragraph>Estimated Shipping</Paragraph>
          <Paragraph>TBD</Paragraph>
        </div>
        <div className='bookstore-cart-summary-row'>
          <Paragraph>Estimated Tax</Paragraph>
          <Paragraph>${tax}</Paragraph>
        </div>
        <Divider />
        <div className='bookstore-cart-summary-row'>
          <Title className='bookstore-cart-summary-title' level={4}>
            Order Total:
          </Title>
          <Title className='bookstore-cart-summary-title' level={4}>
            ${total}
          </Title>
        </div>
      </div>
      <Button className='bookstore-cart-summary-action' type='primary'>
        CHECKOUT
      </Button>
    </div>
  );
}

export default CartSummary;
