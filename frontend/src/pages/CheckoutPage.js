import './CheckoutPage.less';

import React from 'react';

import { Breadcrumb, Button, Col, Row, Typography } from 'antd';

import CartItem from '../components/CartItem.js';
import CartSummary from '../components/CartSummary.js';

const { Title } = Typography;

function CheckoutPage(props) {
  const { cart } = props;

  return (
    <Row justify='center'>
      <Col span={24} className='bookstore-column'>
        <Breadcrumb className='bookstore-breadcrumb'>
          <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
          <Breadcrumb.Item href='/cart'>Cart</Breadcrumb.Item>
          <Breadcrumb.Item href='#'>Checkout</Breadcrumb.Item>
        </Breadcrumb>
        <div className='bookstore-page-section'>
          <div className='bookstore-checkout-module-container'>
            <div className='bookstore-checkout-module'>
              <Title className='bookstore-checkout-module-title'>
                Shipping Address
              </Title>
            </div>

            <div className='bookstore-checkout-module'>
              <Title className='bookstore-checkout-module-title'>
                Billing Information
              </Title>
            </div>

            <div className='bookstore-cart-list'>
              <Title className='bookstore-cart-list-title'>Cart</Title>
              {cart.map((b, i) => (
                <CartItem key={i} {...b} />
              ))}
            </div>
          </div>

          <CartSummary
            cart={cart}
            action={
              <Button type='primary' size='large' block>
                PLACE ORDER
              </Button>
            }
          />
        </div>
      </Col>
    </Row>
  );
}

export default CheckoutPage;
