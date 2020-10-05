import './CheckoutPage.less';

import React from 'react';

import { Breadcrumb, Button, Col, Row, Typography } from 'antd';

import CartList from '../components/CartList.js';
import CartSummary from '../components/CartSummary.js';

const { Title } = Typography;

/**
 * The checkout page. Gather's payment and shipping information from a user before
 * order placement.
 * 
 * @param {!Array<Object<string, *>>} props.cart An array of book objects to be presented
 *     on this page.
 */
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

            <CartList cart={cart} title='Review Cart' />
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
