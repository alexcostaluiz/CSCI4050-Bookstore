import './Notifications.less';

import React from 'react';

import { Button, notification, Typography } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';

const { Paragraph, Title } = Typography;

const CartNotification = {
  open: (props) => {
    const { book, history } = props;
    const { author, bookType, image, price, quantity, title } = book;

    const key = Math.floor(Math.random() * 1e6);
    
    const goTo = (path) => {
      notification.close(key);
      history.push(path);
    };

    notification.open({
      key: key,
      message: (
        <div>
          <CheckCircleFilled className='bookstore-notification-cart-icon' />
          <Title className='bookstore-notification-cart-title' level={4}>
            Item Successfully Added To Cart
          </Title>
        </div>
      ),
      description: (
        <div className='bookstore-notification-cart'>
          <img
            className='bookstore-notification-cart-image'
            src={image}
            alt={title}
          />
          <div className='bookstore-notification-cart-description'>
            <Title level={5}>{title}</Title>
            <Paragraph> by {author}</Paragraph>
            <Paragraph style={{ marginBottom: '0px' }}>{bookType}</Paragraph>
            <Title level={4} style={{ marginTop: '0px' }}>
              ${price}
            </Title>
            <Paragraph>Qty: {quantity}</Paragraph>
          </div>
        </div>
      ),
      btn: [
        <Button
          className='bookstore-notification-cart-action'
          type='primary'
          onClick={() => goTo('/cart')}>
          OPEN CART
        </Button>,
        <Button
          className='bookstore-notification-cart-action'
          onClick={() => goTo('/checkout')}>
          CHECKOUT
        </Button>,
      ],
      style: { width: 'unset' },
    });
  },
};

export { CartNotification };
