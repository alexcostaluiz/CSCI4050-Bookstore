import './BookListing.less';

import React, { useState, useContext } from 'react';

import { useHistory } from 'react-router-dom';

import {
  Button,
  Divider,
  InputNumber,
  message,
  Radio,
  Rate,
  Typography,
} from 'antd';

import CartContext from '../contexts/CartContext.js';
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
    sellPrice,
    /* edition, */
    promo,
    title,
    rating = 4.5,
    numRatings = 492,
  } = book;

  const history = useHistory();
  const cart = useContext(CartContext);
  const [bookType, setBookType] = useState('Hardcover');
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  const addToCart = async () => {
    setAddingToCart(true);

    const item = {
      book: book,
      quantity: quantity,
    };

    const success = await cart.add(item);
    if (success) {
      CartNotification.open({ book, history, quantity });
    } else {
      message.error('Failed to add product to cart.');
    }
    setAddingToCart(false);
  };

  return (
    <div className='bookstore-bp-book-info'>
      <Title className='bookstore-bp-book-title'>{title}</Title>
      <Paragraph className='bookstore-bp-book-author'>
        {authors.reduce((s, a) => s + a.name + ' (' + a.role + '),', '').slice(0, -1)}
      </Paragraph>
      <div>
        <Rate className='bookstore-bp-book-rate' value={rating} disabled />
        <Paragraph className='bookstore-bp-book-rate-text'>
          {rating}&emsp;|&emsp;{numRatings} review
          {numRatings === 1 ? '' : 's'}
        </Paragraph>
      </div>
      <Divider />
      <Paragraph className='bookstore-bp-book-type'>{'Hardcover'}</Paragraph>
      <div>
        <Title className='bookstore-bp-book-price'>
          ${promo === null ? sellPrice.toFixed(2) : sellPrice.toFixed(2)}
        </Title>
        {promo === null ? null : (
          <Paragraph className='bookstore-bp-book-sale'>
            ${sellPrice.toFixed(2)}
          </Paragraph>
        )}
      </div>
      <Paragraph className='bookstore-bp-label'>Select Type</Paragraph>
      <Radio.Group
        className='bookstore-bp-book-type-select'
        defaultValue={bookType}
        buttonStyle='solid'
        onChange={(e) => setBookType(e.target.value)}
        size='large'>
        <Radio.Button value='Hardcover'>
          <span>Hardcover</span>
          <span className='bookstore-bp-book-type-price'>
            ${sellPrice}
          </span>
        </Radio.Button>
        <Radio.Button value='Paperback'>
          <span>Paperback</span>
          <span className='bookstore-bp-book-type-price'>
            ${sellPrice}
          </span>
        </Radio.Button>
      </Radio.Group>
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
              loading={addingToCart}
              onClick={addToCart}>
              ADD TO CART
            </Button>
          ]
        : null}
    </div>
  );
}

export default BookListing;
