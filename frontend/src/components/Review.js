import './Review.less';

import React, { useState } from 'react';

import { Avatar, Comment, Rate, Tooltip, Typography } from 'antd';
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
} from '@ant-design/icons';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const { Paragraph, Title } = Typography;
dayjs.extend(relativeTime);

// TODO: REMOVE
/**
 * An array of sample reviews.
 *
 * @type {!Array<Object<string, *>>}
 */
const reviews = Array.from({ length: 114 }, (e, i) => {
  const reviewContent =
    'This is a review. I am typing my thoughts on this book' +
    ' for the world to see.';
  return {
    id: '95824' + Math.floor(Math.random() * 1e5),
    user: {
      name: 'Alexander Costa',
      avatar:
        'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    },
    rating: Math.ceil(Math.random() * 5),
    title: 'This is review #' + i,
    content: Array.from(
      { length: Math.ceil(Math.random() * 15) },
      (e) => reviewContent
    ).join(' '),
    spoilers: Math.round(Math.random()),
    datetime: 1601446243 - Math.floor(Math.random() * 1e8),
    likes: Math.floor(Math.random() * 1e3),
    dislikes: Math.floor(Math.random() * 1e3),
    recommended: Math.round(Math.random()),
  };
});

/**
 * A customer product review.
 *
 * @param {string} props.content The text content of this review.
 * @param {number} props.datetime The timestamp of this review in UNIX Epoch Time (number
 *     of seconds that have elapsed since January 1, 1970 00:00:00 UTC).
 * @param {number} props.dislikes The number of dislikes on this review.
 * @param {number} props.likes The number of likes on this review.
 * @param {number} props.rating The rating (out of 5) given in this review.
 * @param {boolean} props.recommended True if the reviewer recommends the product being
 *     reviewed; false otherwise.
 * @param {boolean} props.spoilers True if this review contains spoilers about the product
 *     being reviewed; false otherwise.
 * @param {string} props.title The title of this review.
 * @param {!Object<string, *>} props.user The reviewer's user account information.
 */
function Review(props) {
  const {
    content,
    datetime,
    dislikes: idislikes,
    likes: ilikes,
    rating,
    recommended,
    spoilers,
    title,
    user,
  } = props;

  const [likes, setLikes] = useState(ilikes);
  const [dislikes, setDislikes] = useState(idislikes);
  const [action, setAction] = useState(null);

  const like = () => {
    if (action === 'disliked') setDislikes((prev) => prev - 1);
    if (action !== 'liked') {
      setLikes((prev) => prev + 1);
      setAction('liked');
    }
    if (action === 'liked') {
      setLikes((prev) => prev - 1);
      setAction(null);
    }
  };

  const dislike = () => {
    if (action === 'liked') setLikes((prev) => prev - 1);
    if (action !== 'disliked') {
      setDislikes((prev) => prev + 1);
      setAction('disliked');
    }
    if (action === 'disliked') {
      setDislikes((prev) => prev - 1);
      setAction(null);
    }
  };

  const actions = [
    <Tooltip key='review-like' title='Helpful'>
      <span onClick={like}>
        {action === 'liked' ? <LikeFilled /> : <LikeOutlined />}
        <span className='bookstore-review-action'>{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key='review-dislike' title='Unhelpful'>
      <span onClick={dislike}>
        {action === 'disliked' ? <DislikeFilled /> : <DislikeOutlined />}
        <span className='bookstore-review-action'>{dislikes}</span>
      </span>
    </Tooltip>,
  ];

  return (
    <Comment
      actions={actions}
      author={user.name}
      avatar={<Avatar src={user.avatar} alt={user.name} />}
      className='bookstore-review'
      content={[
        <div key='title' className='bookstore-review-content-container'>
          <Rate className='bookstore-review-rating' disabled value={rating} />
          <Title className='bookstore-review-title' level={3}>
            {title}
          </Title>
        </div>,
        <Paragraph
          key='content'
          ellipsis={{ rows: 5, expandable: true, symbol: 'more' }}>
          {content}
        </Paragraph>,
        <Paragraph key='spoilers'>
          <b>Review Contains Spoilers:</b> {spoilers ? 'Yes' : 'No'}
        </Paragraph>,
        <Paragraph key='recommendation'>
          <b>{recommended ? 'Yes' : 'No'}</b>, I {recommended ? '' : 'do not '}
          recommend this product.
        </Paragraph>,
      ]}
      datetime={
        <Tooltip title={dayjs.unix(datetime).format('YYYY-MM-DD HH:mm:ss')}>
          <span>{dayjs.unix(datetime).fromNow()}</span>
        </Tooltip>
      }
    />
  );
}

export { Review as default, reviews };
