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
import Colors from '../services/ColorService.js';
import Slider from './Slider.js';
import WikiService from '../services/WikiService.js';

const { Paragraph, Text, Title } = Typography;

/**
 * A page to display detailed information about one book.
 *
 * @param {!Book} props.book The book whose author's details should be displayed.
 */
function BookAuthorDetails(props) {
  const { book } = props;
  const {
    authors,
    categories,
    description,
    /* edition, */
    isbn,
    pages,
    pubDate,
    publisher,
    tags,
  } = book;

  const [authorWiki, setAuthorWiki] = useState(null);

  useEffect(() => {
    (async () => {
      const result = await WikiService.fetchAuthor(authors[0].name);
      if (result) setAuthorWiki(result);
    })();
  }, [authors]);

  return (
    <Tabs
      className='bookstore-bp-book-tabs'
      defaultActiveKey='0'
      size='large'
      centered>
      <Tabs.TabPane tab='Description' key='0'>
        <Title className='bookstore-bp-book-tabs-title' level={2}>
          Product Desciption
        </Title>
        <div className='bookstore-bp-book-author-description'>
          <Text style={{ whiteSpace: 'pre-wrap' }}>{description}</Text>
        </div>
      </Tabs.TabPane>
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
            {dayjs(pubDate).format('MMMM DD, YYYY')}
          </Descriptions.Item>
          <Descriptions.Item label='Pages'>{pages}</Descriptions.Item>
          <Descriptions.Item label='Categories' span={2}>
            {categories.map((c, i) => (
              <Tag
                className='bookstore-bp-book-tag'
                key={c}
                color={Colors.category(c)}>
                {c.replaceAll('_', ' ')}
              </Tag>
            ))}
          </Descriptions.Item>
          <Descriptions.Item label='Tags' span={2}>
            {tags.map((t, i) => (
              <Tag
                className='bookstore-bp-book-tag'
                key={t}
                color={Colors.category(t)}>
                {t[0] + t.slice(1).toLowerCase()}
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
      <Tabs.TabPane tab={`More by ${authors[0].name}`} key={3}>
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
