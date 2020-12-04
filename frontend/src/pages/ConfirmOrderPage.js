import './ConfirmOrderPage.less';

import React from 'react';

import { useHistory, useLocation } from 'react-router-dom';

import { Button, Col, Descriptions, Result, Row, Typography } from 'antd';

const { Title } = Typography;

function ConfirmOrderPage(props) {
  const history = useHistory();
  const location = useLocation();
  const {id: orderId, orderDate, address, payment: card, promo } = location.state;
  
  return (
    <Row justify='center'>
      <Col span={24} className='bookstore-column'>
        <div className='bookstore-page-section'>
          <div className='bookstore-confirm-container'>
            <Title style={{ fontWeight: '900' }}>Thank you for your purchase!</Title>
            <Result
              status='success'
              title='Your order has been successfully placed!'
              subTitle='You should receive a confimation email shortly.'
              style={{ padding: '24px' }}
            />
            <Title level={3} style={{ fontWeight: '900' }}>Order Details</Title>
            <Descriptions bordered>
              <Descriptions.Item label='Confirmation No'>{orderId}</Descriptions.Item>
              <Descriptions.Item label='Order Date'>{orderDate}</Descriptions.Item>
              <Descriptions.Item label='Promo Code'>
                {promo ? promo : <i>N/A</i>}
              </Descriptions.Item>
              <Descriptions.Item label='Shipping Address' span={3}>
                <b>{address.name}</b> {address.address1}, {address.address2}{' '}
                {address.city}, {address.state} {address.zip} {address.country}                
              </Descriptions.Item>
              <Descriptions.Item label='Payment' span={3}>
                <b>{card.cardType}</b> ending in {card.number.slice(-4)}{' '}
                {card.name} {card.expiry}
              </Descriptions.Item>
            </Descriptions>
            <div style={{ textAlign: 'center', marginTop: '48px' }}>
              <Button type='primary' size='large' onClick={() => history.push('/')}>
                CONTINUE SHOPPING
              </Button>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default ConfirmOrderPage;
