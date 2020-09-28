import './HomePage.less';

import React from 'react';

import { Skeleton, Typography } from 'antd';

import Section, { sections, signedInSections } from '../components/Section.js';

const { Title } = Typography;

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
    <Section key='hp-section-1' title={sections[0]} primary />,
    <Section key='hp-section-2' title={sections[2]} />,
    <Section key='hp-section-3' title={sections[1]} />,
  ];
}

export default HomePage;
