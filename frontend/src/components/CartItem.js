import './CartItem.less';

import React from 'react';

import { Button, InputNumber, Typography } from 'antd';

const { Paragraph, Title } = Typography;

function CartItem(props) {
  const { author, bookType = 'Hardcover', image, price, quantity = 1, title } = props;
  
  return (
    <div className='bookstore-cart-item-wrapper'>
      <div className='bookstore-cart-item'>
        <img className='bookstore-cart-item-image' src={image} alt={title} />
        <div className='bookstore-cart-item-details'>
          <Title className='bookstore-cart-item-title' level={4}>{title}</Title>
          <Paragraph>by {author}</Paragraph>
          <Paragraph style={{ marginBottom: '0px' }}>{bookType}</Paragraph>
          <Title level={4} style={{ marginTop: '0px' }}>
            ${price}
          </Title>
          <Paragraph style={{ marginBottom: '4px' }}>Qty:</Paragraph>
          <InputNumber value={quantity} />
        </div>
      </div>
      <div className='bookstore-cart-item-action-container'>
        <Button className='bookstore-cart-item-action' type='link'>Save for Later</Button>
        <Button className='bookstore-cart-item-action' type='primary'>EDIT</Button>
        <Button className='bookstore-cart-item-action'>REMOVE</Button>
      </div>
    </div>
  );
}

export default CartItem;
