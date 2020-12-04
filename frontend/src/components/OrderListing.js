import '../pages/CheckoutPage.less';

import React, { useState } from 'react';

import { Breadcrumb, Col, Row, Typography } from 'antd';

import CartList from '../components/CartList.js';
import CartSummary from '../components/CartSummary.js';
import DB from '../services/DatabaseService';

const { Paragraph, Title } = Typography;

function OrderListing(props) {
  const { order } = props;
  const [popOrder, setPopOrder] = useState(order);

  (async () => {
    let array = [];
    for (var item in order.orderCart) {
      console.log(item.book.id);
      const book = await DB.fetchBook(item.book.id);
      const obj = {
        book: book,
        quantity: item.quantity,
      };
      array.push(obj);
    }
    setPopOrder(array);
  })();

  if (popOrder != null) {
    return (
      <Row justify='center'>
        <Col span={24} className='bookstore-column'>
          <Breadcrumb className='bookstore-breadcrumb'>
            <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
            <Breadcrumb.Item href='/orderHistory'>
              Order History
            </Breadcrumb.Item>
            <Breadcrumb.Item href='#'>Order {popOrder.id}</Breadcrumb.Item>
          </Breadcrumb>
          <div className='bookstore-page-section'>
            <div className='bookstore-checkout-module-container'>
              <div className='bookstore-checkout-module'>
                <Title className='bookstore-checkout-module-title'>
                  Shipping Address
                </Title>

                <Paragraph ellipsis={{ rows: 1 }} style={{ display: 'inline' }}>
                  <b>{popOrder.address.name}</b> {popOrder.address.address1},{' '}
                  {popOrder.address.address2} {popOrder.address.city},{' '}
                  {popOrder.address.state} {popOrder.address.zip}{' '}
                  {popOrder.address.country}
                </Paragraph>
              </div>

              <div className='bookstore-checkout-module'>
                <Title className='bookstore-checkout-module-title'>
                  Payment Information
                </Title>
                {console.log(popOrder)}
                <Paragraph
                  style={{ marginBottom: '0px' }}
                  key={popOrder.payment}>
                  <b>{popOrder.payment.cardType}</b> ending in{' '}
                  {popOrder.payment.number.slice(-4)}
                </Paragraph>
              </div>

              <CartList title='Review Cart' />
              {popOrder.promo ? (
                <div className='bookstore-checkout-module'>
                  <Title className='bookstore-checkout-module-title'>
                    Promotion Information
                  </Title>

                  <Paragraph
                    style={{ marginBottom: '0px' }}
                    key={popOrder.promo}>
                    <b>Promotion code: {popOrder.promo.promoCode}</b> for a %
                    {popOrder.promo.discount * 100} discount
                  </Paragraph>
                </div>
              ) : (
                <div />
              )}
            </div>

            <CartSummary promo={popOrder.promo} action={<div />} />
          </div>
        </Col>
      </Row>
    );
  } else {
    return <div />;
  }
}

export default OrderListing;
