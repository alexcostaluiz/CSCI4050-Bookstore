import '../pages/CheckoutPage.less';

import React, { useEffect, useState } from 'react';

import { Breadcrumb, Col, Row, Spin, Typography } from 'antd';

import CartList from '../components/CartList.js';
import CartSummary from '../components/CartSummary.js';
import DB from '../services/DatabaseService';

const { Paragraph, Title } = Typography;

function OrderListing(props) {
  const { order } = props;

  const [orderCartMapped, setOrderCartMapped] = useState(false);

  useEffect(() => {
    (async () => {
      let cart = [];
      for (var item in order.orderCart) {
        const book = await DB.fetchBook(item);
        const obj = {
          book: book,
          quantity: order.orderCart[item],
        };
        cart.push(obj);
      }
      order.orderCart = cart;
      setOrderCartMapped(true);
    })();
  }, [order]);

  if (orderCartMapped) {
    return (
      <Row justify='center'>
        <Col span={24} className='bookstore-column'>
          <Breadcrumb className='bookstore-breadcrumb'>
            <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
            <Breadcrumb.Item href='/orderHistory'>
              Order History
            </Breadcrumb.Item>
            <Breadcrumb.Item href='#'>Order {order.id}</Breadcrumb.Item>
          </Breadcrumb>
          <div className='bookstore-page-section'>
            <div className='bookstore-checkout-module-container'>
              <div className='bookstore-checkout-module'>
                <Title className='bookstore-checkout-module-title'>
                  Shipping Address
                </Title>
                <Paragraph ellipsis={{ rows: 1 }} style={{ display: 'inline' }}>
                  <b>{order.address.name}</b> {order.address.address1},{' '}
                  {order.address.address2} {order.address.city},{' '}
                  {order.address.state} {order.address.zip}{' '}
                  {order.address.country}
                </Paragraph>
              </div>

              <div className='bookstore-checkout-module'>
                <Title className='bookstore-checkout-module-title'>
                  Payment Information
                </Title>
                <Paragraph
                  style={{ marginBottom: '0px' }}
                  key={order.payment}>
                  <b>{order.payment.cardType}</b> ending in{' '}
                  {order.payment.number.slice(-4)}
                </Paragraph>
              </div>

              <CartList title='Review Order' orderCart={order.orderCart} readOnly />
              {order.promo ? (
                <div className='bookstore-checkout-module'>
                  <Title className='bookstore-checkout-module-title'>
                    Promotion Information
                  </Title>

                  <Paragraph
                    style={{ marginBottom: '0px' }}
                    key={order.promo}>
                    <b>Promotion code: {order.promo.promoCode}</b> for a %
                    {order.promo.discount * 100} discount
                  </Paragraph>
                </div>
              ) : (
                <div />
              )}
            </div>
            <CartSummary promo={order.promo} action={<div />} order={order} />
          </div>
        </Col>
      </Row>
    );
  } else {
    return <Spin />;
  }
}

export default OrderListing;
