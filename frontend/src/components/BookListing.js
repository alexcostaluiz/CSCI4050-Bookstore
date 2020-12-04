import './BookListing.less';

import React, { useState, useContext } from 'react';

import { useHistory } from 'react-router-dom';

import {
  Button,
  Divider,
  InputNumber,
  /*Radio, Rate,*/ Typography,
} from 'antd';

import CartContext from '../contexts/CartContext.js';
import AuthContext from '../contexts/AuthContext.js';
import { CartNotification } from '../components/Notifications.js';

const { Paragraph, Title } = Typography;

/**
 * A book listing. Gives a choice of type (hardcover, paperback, etc.) and quantity.
 * Grants the ability to add the book to a cart.
 *
 * @param {!Book} props.book The book whose information should be displayed in this listing.
 * @param {?ReactNode} props.noAction True if this component should not display any action
 *     buttons at the bottom; false otherwise.
 */
function BookListing(props) {
  const { book, noAction } = props;
  const {
    authors,
    /*bookType: initBookType,*/
    edition,
    /**numRatings,**/
    buyPrice,
    /*quantity: initQuantity,*/
    /**rating,**/
    title,
  } = book;

  const history = useHistory();
  const cart = useContext(CartContext);
  const auth = useContext(AuthContext);
  /*const [bookType, setBookType] = useState(initBookType);*/
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  const addToCart = () => {
    setAddingToCart(true);
    setTimeout(() => {
      setAddingToCart(false);
    }, 1000);

    const item = {
      book: book,
      quantity: quantity,
    };

    cart.add(item);
    CartNotification.open({ book, history, quantity });
  };

  return (
    <div className='bookstore-bp-book-info'>
      <Title className='bookstore-bp-book-title'>{title}</Title>
      <Paragraph className='bookstore-bp-book-author'>
        by {authors[0].name}
      </Paragraph>
      <div>
        {/*
        <Rate className='bookstore-bp-book-rate' value={rating} disabled />
        
        <Paragraph className='bookstore-bp-book-rate-text'>
          {rating}&emsp;|&emsp;{numRatings} review
          {numRatings === 1 ? '' : 's'}
        </Paragraph>
        */}
      </div>
      <Divider />
      {/*<Paragraph className='bookstore-bp-book-type'>{bookType}</Paragraph>*/}
      <div>
        <Title className='bookstore-bp-book-price'>
          ${buyPrice.toFixed(2)}
        </Title>
        <Paragraph className='bookstore-bp-book-sale'>
          ${(buyPrice * 1.2).toFixed(2)}
        </Paragraph>
      </div>
      {/*
      <Paragraph className='bookstore-bp-label'>Select Type</Paragraph>
      <Radio.Group
        className='bookstore-bp-book-type-select'
        defaultValue={bookType}
        buttonStyle='solid'
        onChange={(e) => setBookType(e.target.value)}
        size='large'>
        <Radio.Button value='Hardcover'>
          <span>Hardcover</span>
          <span className='bookstore-bp-book-type-price'>${buyPrice}</span>
        </Radio.Button>
        <Radio.Button value='Paperback'>
          <span>Paperback</span>
          <span className='bookstore-bp-book-type-price'>${buyPrice}</span>
        </Radio.Button>
        <Radio.Button value='Audio'>
          <span>Audio</span>
          <span className='bookstore-bp-book-type-price'>${buyPrice}</span>
        </Radio.Button>
      </Radio.Group>
      */}
      {!noAction
        ? [
            <Paragraph className='bookstore-bp-label'>
              Select Quantity
            </Paragraph>,
            <InputNumber
              className='bookstore-bp-book-quantity'
              min={1}
              value={quantity}
              onChange={(e) => (e ? setQuantity(e) : setQuantity(1))}
              style={noAction ? { marginBottom: '0px' } : null}
            />,

            <Button
              key='add-to-cart'
              className='bookstore-bp-add-cart'
              type='primary'
              size='large'
              disabled={addingToCart}
              onClick={addToCart}>
              {addingToCart ? 'ADDED!' : 'ADD TO CART'}
            </Button>,
            <Button
              key='add-to-wish-list'
              className='bookstore-bp-add-wish-list'
              type='link'>
              Add to Wish List
            </Button>,
          ]
        : null}
    </div>
  );
}

export default BookListing;
