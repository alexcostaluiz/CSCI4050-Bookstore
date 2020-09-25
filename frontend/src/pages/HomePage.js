import './HomePage.less';

import React from 'react';

import { Typography } from 'antd';

const { Title } = Typography;

function HomePage(props) {
  return (
    <div className='bookstore-hp-grid-container'>
      <div className='bookstore-hp-grid one' >
        <Title className='bookstore-welcome-text'>Welcome, Alex.</Title>
      </div>
      <div className='bookstore-hp-grid two' />
      <div className='bookstore-hp-grid three' />
      <div className='bookstore-hp-grid four' />
    </div>
  );
}

export default HomePage;
