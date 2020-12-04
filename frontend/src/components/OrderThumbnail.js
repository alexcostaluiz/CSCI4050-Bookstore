import './BookThumbnail.less';

import React from 'react';

import { useHistory } from 'react-router-dom';

import { Card, Typography } from 'antd';

const { Paragraph, Title } = Typography;

function OrderThumbnail(props) {
    const{ order } = props;
    const history = useHistory();

  return (
    <Card
      className={
        'bookstore-book-thumbnail bookstore-book-thumbnail-lg'
      }
      bordered={false}
      onClick={() => history.push(`/o/${order.id}`)}
      cover={
        <img
          className={
            'bookstore-book-thumbnail-image bookstore-book-thumbnail-image-lg'
          }
          src={'https://i.stack.imgur.com/1hvpD.jpg'}
          alt='Book cover'
          draggable={false}
        />
      }
      hoverable>
      <Title
        className={
          'bookstore-book-thumbnail-title bookstore-book-thumbnail-title-lg'
        }
        level={5}>
        Order number: {order.id}
      </Title>
      <Paragraph
        className={
          'bookstore-book-thumbnail-author bookstore-book-thumbnail-author-lg'
        }>
        <b>{order.address.name}</b> {order.address.address1}, {order.address.address2} {order.address.city},{' '}
                    {order.address.state} {order.address.zip} {order.address.country}
      </Paragraph>
      
    </Card>
  );
}

export default OrderThumbnail;