import '../pages/CheckoutPage.less';

import React, { useEffect, useState } from 'react';

import { Breadcrumb, Col, Row, Spin, Typography } from 'antd';

import CartList from '../components/CartList.js';
import CartSummary from '../components/CartSummary.js';
import DB from '../services/DatabaseService';

const { Paragraph, Title } = Typography;

function OrderListing(props) {
  const { order } = props;

  const [orderCart, setOrderCart] = useState(null);

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
      setOrderCart(cart);
    })();
  }, [order]);

  if (orderCart) {
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
                <Paragraph style={{ marginBottom: '0px' }} key={order.payment}>
                  <b>{order.payment.cardType}</b> ending in{' '}
                  {order.payment.number.slice(-4)}
                </Paragraph>
              </div>

              <CartList title='Review Order' orderCart={orderCart} readOnly />
              {order.promo ? (
                <div className='bookstore-checkout-module'>
                  <Title className='bookstore-checkout-module-title'>
                    Promotion Information
                  </Title>

                  <Paragraph style={{ marginBottom: '0px' }} key={order.promo}>
                    <b>Promotion code: {order.promo.promoCode}</b> for a %
                    {order.promo.discount * 100} discount
                  </Paragraph>
                </div>
              ) : (
                <div />
              )}
            </div>
<<<<<<< HEAD
            <CartSummary promo={order.promo} action={<div />} order={order} />
=======
            <CartSummary
              promo={order.promo}
              action={<div />}
              order={{ ...order, orderCart }}
            />
>>>>>>> 04b4037d614de46af3bf8fd26658ee16991e88ad
          </div>
        </Col>
      </Row>
    );
  } else {
    return <Spin />;
  }
}

export default OrderListing;
