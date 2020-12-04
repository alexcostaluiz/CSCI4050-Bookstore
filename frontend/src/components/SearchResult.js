// import './SearchResult.less';

import React from 'react';

import { useHistory } from 'react-router-dom';

import { Card, Rate, Typography } from 'antd';

import { sampleBooks } from '../contexts/CartContext.js';

const { Paragraph, Title } = Typography;

/**
 * A book thumbnail component. Displays a book cover image, book title, book author,
 * and rating.
 *
 * @param {!Book} props.book The book to display in this thumbnail.
 * @param {string} props.size A string declaring the size of this thumbnail. Must be "large"
 *     or "small" (default: "small").
 * @param {string} props.className A class string to be applied to the parent container
 *     of this component.
 * @param {?Object<string, *>} props.style An optional style object to be applied
 *     to the parent container of this component.
 */
function SearchResult(props) {
  const {
    book,
    size = 'small',
    style,
    className,
  } = props;
  const { author, id, image, numRatings, rating, title, price } = book;

  const history = useHistory();

  return (
    <Card
      className={
        'bookstore-book-thumbnail ' +
        (size === 'large' ? ' bookstore-book-thumbnail-lg ' : '') +
        (className ? className : '')
      }
      bordered={false}
      style={style}
      onClick={() => history.push({ pathname: `/b/00${id}`, state: { book } })}
      cover={
        <img
          className={
            'bookstore-book-thumbnail-image' +
            (size === 'large' ? ' bookstore-book-thumbnail-image-lg' : '')
          }
          src={image}
          alt='Book cover'
          draggable={false}
        />
      }
      hoverable>
      <Title
        className={
          'bookstore-book-thumbnail-title' +
          (size === 'large' ? ' bookstore-book-thumbnail-title-lg' : '')
        }
        level={5}>
        {title}
      </Title>
      <Paragraph
        className={
          'bookstore-book-thumbnail-author' +
          (size === 'large' ? ' bookstore-book-thumbnail-author-lg' : '')
        }>
        {author}
      </Paragraph>
      <Paragraph
        classname='result-price'
      >
        ${price}
      </Paragraph>
      <div className='bookstore-book-thumbnail-rate-container'>
        <Rate
          className={
            'bookstore-book-thumbnail-rate' +
            (size === 'large' ? ' bookstore-book-thumbnail-rate-lg' : '')
          }
          disabled
          defaultValue={4}
        />
        <Paragraph
          className={
            'bookstore-book-thumbnail-rate-text' +
            (size === 'large' ? ' bookstore-book-thumbnail-rate-text-lg' : '')
          }
          style={{ display: 'inline-block' }}>
          {rating}
        </Paragraph>
      </div>
      <Paragraph
        className={
          'bookstore-book-thumbnail-rate-text' +
          (size === 'large' ? ' bookstore-book-thumbnail-rate-text-lg' : '')
        }>
        {numRatings} review{numRatings === 1 ? '' : 's'}
      </Paragraph>
      
    </Card>
  );
}

export default SearchResult;
