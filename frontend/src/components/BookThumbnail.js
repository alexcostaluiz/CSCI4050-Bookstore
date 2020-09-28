import './BookThumbnail.less';

import React from 'react';

import { Card, Rate, Typography } from 'antd';

const { Paragraph, Title } = Typography;

/**
 * A book thumbnail component. Displays a book cover image, book title, book author,
 * and rating.
 *
 * @param {string} props.image The path to this book's cover image.
 * @param {string} props.title The book's title.
 * @param {string} props.author The book's author.
 * @param {number} props.rating The book's rating ([0.0, 5.0]).
 * @param {number} props.numRatings The book's number of ratings.
 * @param {string} props.size A string declaring the size of this thumbnail. Must be "large"
 *     or "small" (default: "small").
 * @param {string} props.className A class string to be applied to the parent container
 *     of this component.
 * @param {?Object<string, *>} props.style An optional style object to be applied
 *     to the parent container of this component.
 */
function BookThumbnail(props) {
  const {
    image = 'https://kottke.org/plus/misc/images/obama-promised-land-book.jpg',
    title = 'A Promised Land: Subtitle Text',
    author = 'Barack Obama',
    rating = 4.1,
    numRatings = 4132,
    size = 'small',
    className,
    style,
  } = props;

  return (
    <Card
      className={
        'bookstore-book-thumbnail ' +
        (size === 'large' ? ' bookstore-book-thumbnail-lg ' : '') +
        (className ? className : '')
      }
      bordered={false}
      style={style}
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
      <Rate
        className='bookstore-book-thumbnail-rate'
        disabled
        defaultValue={4}
      />
      <Paragraph
        className={
          'bookstore-book-thumbnail-rate-text' +
          (size === 'large' ? ' bookstore-book-thumbnail-rate-text-lg' : '')
        }>
        {rating} ({numRatings})
      </Paragraph>
    </Card>
  );
}

export default BookThumbnail;
