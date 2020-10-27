import './CartItem.less';

import React, { useContext, useState } from 'react';

import { Button, InputNumber, Modal, Typography } from 'antd';

import CartContext from '../contexts/CartContext.js';
import BookListing from './BookListing.js';

const { Paragraph, Title } = Typography;

/**
 * A single cart item which displays information about a given book. Provides actions to
 * edit, remove, and save the book for later.
 *
 * @param {!Book} props.book The book whose information should be displayed in this cart item.
 */
function CartItem(props) {
  const { book } = props;
  const { author, bookType, id, image, price, quantity, title } = book;

  const cart = useContext(CartContext);
  const [editing, setEditing] = useState(false);

  const remove = () => {
    cart.remove(id);
  };

  const edit = () => {
    setEditing(true);
  };

  return (
    <div className='bookstore-cart-item-wrapper'>
      <div className='bookstore-cart-item'>
        <img className='bookstore-cart-item-image' src={image} alt={title} />
        <div className='bookstore-cart-item-details'>
          <Title className='bookstore-cart-item-title' level={4}>
            {title}
          </Title>
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
        <Button className='bookstore-cart-item-action' type='link'>
          Save for Later
        </Button>
        <Button
          className='bookstore-cart-item-action'
          type='primary'
          onClick={edit}>
          EDIT
        </Button>
        <Button className='bookstore-cart-item-action' onClick={remove}>
          REMOVE
        </Button>
      </div>
      <Modal
        okText='SAVE'
        cancelText='CANCEL'
        closable={false}
        onOk={() => setEditing(false)}
        onCancel={() => setEditing(false)}
        width='750px'
        wrapClassName='bookstore-cart-item-edit-modal'
        bodyStyle={{ padding: '32px', paddingBottom: '0px' }}
        visible={editing}
        destroyOnClose
        centered>
        <Title className='bookstore-cart-item-edit-modal-title'>
          Edit Item
        </Title>
        <BookListing book={book} noAction />
      </Modal>
    </div>
  );
}

export default CartItem;
