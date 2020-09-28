import './HomePage.less';

import React from 'react';

import { Skeleton, Typography } from 'antd';

import BookThumbnail from '../components/BookThumbnail.js';
import Section, { sections } from '../components/Section.js';
import Slider from '../components/Slider.js';

const { Title } = Typography;

/**
 * The home page of the Bookstore Application.
 */
function HomePage(props) {
  return [
    <div key='hp-grid' className='bookstore-hp-grid-container'>
      <div className='bookstore-hp-grid one'>
        <Title className='bookstore-welcome-text'>Welcome, Alex.</Title>
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
        <Skeleton title={false} paragraph={{ rows: 1, width: ['66%'] }} round />
      </div>
    </div>,
    <Section key='hp-section-1' title={sections[0]}>
      <Slider itemWidth={216} spaceBetween={16} primary>        
        {Array.from({length: 16}, (e, i) => <BookThumbnail key={i} /> )}
      </Slider>
    </Section>,
    <Section key='hp-section-2' title={sections[2]}>
      <Slider itemWidth={216} spaceBetween={16}>
        {Array.from({length: 16}, (e, i) => <BookThumbnail key={i} /> )}
      </Slider>
    </Section>,    
    <Section key='hp-section-3' title={sections[1]}>
      <Slider itemWidth={216} spaceBetween={16}>        
        {Array.from({length: 16}, (e, i) => <BookThumbnail key={i} /> )}
      </Slider>
    </Section>,
  ];
}

export default HomePage;
