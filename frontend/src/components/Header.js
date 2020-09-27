import './Header.less';

import React, { useState } from 'react';

import { Row, Col, Layout, Typography, Menu, AutoComplete, Input } from 'antd';

import DynamicAvatar from './DynamicAvatar.js';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

// TODO: Pull this info from book tags and book genres once those
// are properly defined (single source of truth).
const searchHints = [
  'Bestsellers',
  'Mystery & Crime',
  'Romance',
  'Thrillers',
  'Graphic Novels & Comics',
  'Poetry',
  'Business',
  'Current Affairs & Politics',
  'Psychology',
  'Biography',
  'Self-Help & Relationships',
  'Religion',
  'Cookbooks, Food, & Wine',
  'Sci-Fi & Fantasy',
  'Manga',
  'History',
  'Title, Author, or ISBN',
  'Classics',
  'Teen & Young Adult',
];

function Header(props) {
  const [current, setCurrent] = useState('home');

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <AntHeader className='bookstore-header'>
      <Row align='middle' justify='space-between'>
        <Col>
          <div className='bookstore-col-wrapper'>
            <a href='/'>
              <Title className='bookstore-logo-lg' level={2}>
                Bookstore
              </Title>
            </a>
            <Menu
              onClick={handleClick}
              selectedKeys={[current]}
              mode='horizontal'
              className='bookstore-nav'>
              <Menu.Item key='home'>Home</Menu.Item>
              <Menu.Item key='browse'>Browse</Menu.Item>
              <Menu.Item key='nav3'>Nav3</Menu.Item>
              <Menu.Item key='nav4'>Nav4</Menu.Item>
              <Menu.Item key='sale'>Sale</Menu.Item>
            </Menu>
          </div>
        </Col>
        <Col>
          <div className='bookstore-col-wrapper'>
            <AutoComplete className='bookstore-search-dropdown'>
              <Input.Search
                size='large'
                placeholder={
                  'Try "' +
                  searchHints[Math.floor(Math.random() * searchHints.length)] +
                  '"'
                }
              />
            </AutoComplete>
            <DynamicAvatar isSignedIn={true} />
          </div>
        </Col>
      </Row>
    </AntHeader>
  );
}

export default Header;
