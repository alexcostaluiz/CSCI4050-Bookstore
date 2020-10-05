import './CartSummary.less';

import React, { useContext } from 'react';

import { useHistory } from 'react-router-dom';

import { Button, Divider, Typography } from 'antd';

import CartContext from '../contexts/CartContext.js';

const { Paragraph, Title } = Typography;

/**
 * Summarizes cart information into subtotal, sales tax, shipping costs, and total figures.
 *
 * @param {?ReactNode} props.action An optional custom action button to display at the bottom
 *     of this component (default: small button with "CHECKOUT" text).
 */
function CartSummary(props) {
  const { action } = props;

  const cart = useContext(CartContext);
  const history = useHistory();

  const quantity = cart.get().reduce((a, b) => a + b.quantity, 0);
  const subtotal = cart.get().reduce((a, b) => a + (b.price * b.quantity), 0);
  const tax = 4.99;
  const total = subtotal + tax;

  return (
    <div className='bookstore-cart-summary-wrapper'>
      <Title className='bookstore-cart-summary-title'>Order Summary</Title>
      <div className='bookstore-cart-summary'>
        <div className='bookstore-cart-summary-row'>
          <Paragraph>Subtotal ({quantity} item{quantity > 1 ? 's' : ''})</Paragraph>
          <Paragraph>${subtotal.toFixed(2)}</Paragraph>
        </div>
        <div className='bookstore-cart-summary-row'>
          <Paragraph>Estimated Shipping</Paragraph>
          <Paragraph>TBD</Paragraph>
        </div>
        <div className='bookstore-cart-summary-row'>
          <Paragraph>Estimated Tax</Paragraph>
          <Paragraph>${tax.toFixed(2)}</Paragraph>
        </div>
        <Divider />
        <div className='bookstore-cart-summary-row'>
          <Title className='bookstore-cart-summary-title' level={4}>
            Order Total:
          </Title>
          <Title className='bookstore-cart-summary-title' level={4}>
            ${total.toFixed(2)}
          </Title>
        </div>
      </div>
      {action || (
        <Button
          className='bookstore-cart-summary-action'
          type='primary'
          onClick={() => history.push('/checkout')}>
          CHECKOUT
        </Button>
      )}
    </div>
  );
}

export default CartSummary;
