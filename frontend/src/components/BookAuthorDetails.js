import './BookAuthorDetails.less';

import React, { useEffect, useState } from 'react';

import {
  Button,
  Descriptions,
  Image,
  Skeleton,
  Tabs,
  Tag,
  Typography,
} from 'antd';

import dayjs from 'dayjs';

import BookThumbnail from './BookThumbnail.js';
import Slider from './Slider.js';
import WikiService from '../services/WikiService.js';

const { Paragraph, Title } = Typography;

// TODO: REMOVE
const colors = ['magenta', 'purple', 'red', 'orange'];

/**
 * A page to display detailed information about one book.
 *
 * @param {!Book} props.book The book whose author's details should be displayed.
 */
function BookAuthorDetails(props) {
  const { book } = props;
  const {
    author,
    /* edition, */
    isbn,
    pages,
    publicationDate,
    publisher,
    tags,
  } = book;

  const [authorWiki, setAuthorWiki] = useState(null);

  useEffect(() => {
    (async () => {
      const result = await WikiService.fetchAuthor(author);
      if (result) setAuthorWiki(result);
    })();
  }, [author]);

  return (
    <Tabs
      className='bookstore-bp-book-tabs'
      defaultActiveKey='1'
      size='large'
      centered>
      <Tabs.TabPane tab='Product Details' key='1'>
        <Title className='bookstore-bp-book-tabs-title' level={2}>
          Product Details
        </Title>
        <Descriptions
          className='bookstore-bp-book-data'
          column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
          bordered>
          <Descriptions.Item label='ISBN-13'>{isbn}</Descriptions.Item>
          <Descriptions.Item label='Publisher'>{publisher}</Descriptions.Item>
          <Descriptions.Item label='Publication Date'>
            {dayjs.unix(publicationDate).format('MMMM DD, YYYY')}
          </Descriptions.Item>
          <Descriptions.Item label='Pages'>{pages}</Descriptions.Item>
          <Descriptions.Item label='Tags' span={2}>
            {tags.map((t, i) => (
              <Tag className='bookstore-bp-book-tag' key={t} color={colors[i]}>
                {t}
              </Tag>
            ))}
          </Descriptions.Item>
        </Descriptions>
      </Tabs.TabPane>
      <Tabs.TabPane tab='About the Author' key='2'>
        <Title className='bookstore-bp-book-tabs-title' level={2}>
          About the Author
        </Title>
        <div className='bookstore-bp-book-author-description'>
          <Skeleton
            loading={!authorWiki}
            paragraph={{ rows: 3 }}
            active
            avatar
            round>
            <Image
              className='bookstore-bp-book-author-description-image'
              src={
                authorWiki && authorWiki.original
                  ? authorWiki.original.source
                  : ''
              }
            />
            <Paragraph className='bookstore-bp-book-author-description-text'>
              {authorWiki ? authorWiki.extract : ''}
              <Button
                className='bookstore-bp-book-author-description-link'
                type='link'
                href={
                  'https://en.wikipedia.org?curid=' +
                  (authorWiki ? authorWiki.pageid : '')
                }
                target='_blank'>
                &nbsp;Wikipedia
              </Button>
            </Paragraph>
          </Skeleton>
        </div>
      </Tabs.TabPane>
      <Tabs.TabPane tab={`More by ${author}`} key={3}>
        <Slider itemWidth={216} spaceBetween={16}>
          {Array.from({ length: 3 }, (e, i) => (
            <BookThumbnail key={i} />
          ))}
        </Slider>
      </Tabs.TabPane>
    </Tabs>
  );
}

export default BookAuthorDetails;
