import './CartItem.less';

import React, { useState, useEffect } from 'react';

import { Button, InputNumber, Modal, Spin, Typography } from 'antd';

import BookListing from './BookListing.js';
import DB from '../services/DatabaseService.js';

const { Paragraph, Title } = Typography;

/**
 * A single cart item which displays information about a given book. Provides actions to
 * edit, remove, and save the book for later.
 *
 * @param {!Book} props.book The book whose information should be displayed in this cart item.
 */
function CartItem(props) {

  const {quantity, cart, book} = props;
  const [temp_q, setTemp_q] = useState(quantity);
  const [editing, setEditing] = useState(false);
  const remove = () => {
    cart.remove(book.id);
  };

  const edit = () => {
    const item = {
      book : {
        id : book.id
      },
      quantity : temp_q
    }
    cart.updateItem(item);
    setEditing(false);
  };

  const cancel = () => {
    setEditing(false);
    setTemp_q(quantity);
  };
  if(book === null){
    return <Spin size='large' className='bookstore-cart-item'/>
  } else {
    return (
      <div className='bookstore-cart-item-wrapper'>
        <div className='bookstore-cart-item'>
          <img className='bookstore-cart-item-image' src={book.coverPic} alt={book.title} />
          <div className='bookstore-cart-item-details'>
            <Title className='bookstore-cart-item-title' level={4}>
              {book.title}
            </Title>
            <Paragraph>by {book.authors[0].name}</Paragraph>
            {/*<Paragraph style={{ marginBottom: '0px' }}>{bookType}</Paragraph>*/}
            <Title level={4} style={{ marginTop: '0px' }}>
              ${book.buyPrice}
            </Title>
            <Paragraph style={{ marginBottom: '4px' }}>Qty:</Paragraph>
            <InputNumber value={quantity} readOnly />
          </div>
        </div>
        <div className='bookstore-cart-item-action-container'>
          <Button className='bookstore-cart-item-action' type='link'>
            Save for Later
          </Button>
          <Button
            className='bookstore-cart-item-action'
            type='primary'
            onClick={() => setEditing(true)}>
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
          onOk={edit}
          onCancel={cancel}
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
          <Paragraph className='bookstore-bp-label'>Select Quantity</Paragraph>,
          <InputNumber
            className='bookstore-bp-book-quantity'
            min={1}
            value={temp_q}
            onChange={(e) => (e ? setTemp_q(e) : setTemp_q(1))}
            style={{ marginBottom: '15px' }}
          />
        </Modal>
      </div>
    );
  }
}

export default CartItem;
