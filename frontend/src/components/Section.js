import './Section.less';

import React from 'react';

import { Col, Row, Typography } from 'antd';

import BookThumbnail from './BookThumbnail.js';
import Slider from './Slider.js';

const { Title } = Typography;

const sections = ['Bestsellers', 'New Arrivals', 'Featured'];

const signedInSections = [
  'Recently Viewed',
  'Favorite Category',
  'Favorite Author',
];

function Section(props) {
  const { title, primary } = props;

  return (
    <Row className='bookstore-hp-section'>
      <Col span={24}>
        <Title className='bookstore-hp-section-title' level={2}>
          {title}
        </Title>
        <Slider itemWidth={216} spaceBetween={16} primary={primary}>
          <BookThumbnail />
          <BookThumbnail />
          <BookThumbnail />
          <BookThumbnail />
          <BookThumbnail />
          <BookThumbnail />
          <BookThumbnail />
          <BookThumbnail />
          <BookThumbnail />
          <BookThumbnail />
          <BookThumbnail />
          <BookThumbnail />
          <BookThumbnail />
          <BookThumbnail />
          <BookThumbnail />
          <BookThumbnail />
          <BookThumbnail />
        </Slider>
      </Col>
    </Row>
  );
}

export { Section as default, sections, signedInSections };
