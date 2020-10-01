import './Notifications.less';

import React from 'react';

import { Button, notification, Typography } from 'antd';

const { Paragraph, Title } = Typography;

const CartNotification = {
  open: (props) => {
    const { author, bookType, image, price, quantity, title } = props;

    notification.open({
      message: (
        <Title className='bookstore-notification-cart-title' level={4}>
          Item Successfully Added To Cart
        </Title>
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
        <Button type='primary'>OPEN CART</Button>,
        <Button style={{ marginLeft: '8px' }}>CHECKOUT</Button>,
      ],
      onClick: () => console.log('Notif clicked'),
      style: { width: 'unset' },
    });
  },
};

export { CartNotification };
