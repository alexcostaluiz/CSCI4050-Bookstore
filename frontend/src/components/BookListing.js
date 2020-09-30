import './BookListing.less';

import React, { useState } from 'react';

import { Button, Divider, InputNumber, Radio, Rate, Typography } from 'antd';

import { CartNotification } from '../components/Notifications.js';

const { Paragraph, Title } = Typography;

/**
 * A book listing. Gives a choice of type (hardcover, paperback, etc.) and quantity.
 * Grants the ability to add the book to a cart.
 *
 * @param {string} props.author The author of this book.
 * @param {?string} props.edition The edition information of this book.
 * @param {string} props.image The path to the cover image of this book.
 * @param {number} props.numRatings The number of ratings for this book.
 * @param {number} props.price The selling price of this book.
 * @param {number} props.rating The average rating of this book (out of 5).
 * @param {string} props.title The title of this book.
 */
function BookListing(props) {
  const {
    author,
    /** edition, **/
    image,
    numRatings,
    price,
    rating,
    title,
  } = props;

  const [bookType, setBookType] = useState('Hardcover');
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  const addToCart = () => {
    setAddingToCart(true);
    setTimeout(() => {
      setAddingToCart(false);
    }, 1000);

    CartNotification.open({ author, bookType, image, price, quantity, title });
  };

  return (
    <div className='bookstore-bp-book-info'>
      <Title className='bookstore-bp-book-title'>{title}</Title>
      <Paragraph className='bookstore-bp-book-author'>by {author}</Paragraph>
      <div>
        <Rate className='bookstore-bp-book-rate' value={rating} disabled />
        <Paragraph className='bookstore-bp-book-rate-text'>
          {rating}&emsp;|&emsp;{numRatings} review
          {numRatings === 1 ? '' : 's'}
        </Paragraph>
      </div>
      <Divider />
      <Paragraph className='bookstore-bp-book-type'>{bookType}</Paragraph>
      <div>
        <Title className='bookstore-bp-book-price'>${price.toFixed(2)}</Title>
        <Paragraph className='bookstore-bp-book-sale'>
          ${(price * 1.2).toFixed(2)}
        </Paragraph>
      </div>
      <Paragraph className='bookstore-bp-label'>Select Type</Paragraph>
      <Radio.Group
        className='bookstore-bp-book-type-select'
        defaultValue='Hardcover'
        buttonStyle='solid'
        onChange={(e) => setBookType(e.target.value)}
        size='large'>
        <Radio.Button value='Hardcover'>
          <span>Hardcover</span>
          <span className='bookstore-bp-book-type-price'>${price}</span>
        </Radio.Button>
        <Radio.Button value='Paperback'>
          <span>Paperback</span>
          <span className='bookstore-bp-book-type-price'>${price}</span>
        </Radio.Button>
        <Radio.Button value='Audio'>
          <span>Audio</span>
          <span className='bookstore-bp-book-type-price'>${price}</span>
        </Radio.Button>
      </Radio.Group>
      <Paragraph className='bookstore-bp-label'>Select Quantity</Paragraph>
      <InputNumber
        className='bookstore-bp-book-quantity'
        min={1}
        value={quantity}
        onChange={(e) => (e ? setQuantity(e) : setQuantity(1))}
      />
      <Button
        className='bookstore-bp-add-cart'
        type='primary'
        size='large'
        disabled={addingToCart}
        onClick={addToCart}>
        {addingToCart ? 'ADDED!' : 'ADD TO CART'}
      </Button>
      <Button className='bookstore-bp-add-wish-list' type='link'>
        Add to Wish List
      </Button>
    </div>
  );
}

export default BookListing;
