import './HomePage.less';

import React, { useContext, useEffect, useState } from 'react';

import { Col, Row, Skeleton, Typography } from 'antd';

import AuthContext from '../contexts/AuthContext.js';
import BookThumbnail from '../components/BookThumbnail.js';
import DB from '../services/DatabaseService.js';
import Section, { sections } from '../components/Section.js';
import Slider from '../components/Slider.js';

const { Title } = Typography;

/**
 * The home page of the Bookstore Application.
 */
function HomePage(props) {
  const auth = useContext(AuthContext);

  const [books, setBooks] = useState([]);

  useEffect(() => {
    (async () => {
      const books = await DB.retrieveBooks();
      setBooks(books.filter((b) => !b.archived));
    })();
  }, []);
  
  return (
    <Row>
      <Col className='bookstore-hp-col' span={24}>
        {auth.user && auth.user.id ? (
          <Title level={1} className='bookstore-welcome-text'>
            Welcome, {auth.user.firstName}!
          </Title>
        ) : null}
        <div key='hp-grid' className='bookstore-hp-grid-container'>
          <div className='bookstore-hp-grid one'>
            <Skeleton
              title={false}
              paragraph={{ rows: 2, width: ['33%', '100%'] }}
              round
            />
          </div>
          <div className='bookstore-hp-grid two'>
            <Skeleton.Avatar size='large' />
            <Skeleton
              title={false}
              paragraph={{ rows: 3, width: ['33%', '100%', '75%'] }}
              round
            />
          </div>
          <div className='bookstore-hp-grid three'>
            <span />
            <Skeleton
              title={false}
              paragraph={{ rows: 2, width: ['50%', '100%'] }}
              round
              avatar
            />
          </div>
          <div className='bookstore-hp-grid four'>
            <span />
            <Skeleton
              title={false}
              paragraph={{ rows: 1, width: ['66%'] }}
              round
            />
          </div>
        </div>
        <Section key='hp-section-1' title={sections[0]}>
          <Slider itemWidth={216} spaceBetween={16} primary>
            {books.filter(b => {
              return b.tags.includes('BESTSELLER');
            }).map((b) => (
              <BookThumbnail key={b.id} book={b} />
            ))}
          </Slider>
        </Section>
        <Section key='hp-section-2' title={sections[1]}>
          <Slider itemWidth={216} spaceBetween={16}>
            {books.filter(b => {
              return b.tags.includes('FEATURED');
            }).map((b) => (
              <BookThumbnail key={b.id} book={b} />
            ))}
          </Slider>
        </Section>
      </Col>
    </Row>
  );
}

export default HomePage;
