import './Header.less';

import React, { useState } from 'react';

import { useHistory, useLocation } from 'react-router-dom';

import {
  AutoComplete,
  Badge,
  Button,
  Col,
  Input,
  Menu,
  Row,
  Typography,
} from 'antd';
import { ShoppingCartOutlined as Cart } from '@ant-design/icons';

import DynamicAvatar from './DynamicAvatar.js';

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

  const history = useHistory();
  const location = useLocation();

  let simple =
    location.pathname.startsWith('/checkout') ||
    location.pathname.startsWith('/admin');

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  if (simple) {
    return (
      <Row className='bookstore-header' align='middle' justify='space-between'>
        <Col span={24}>
          <div className='bookstore-header-wrapper'>
            <div style={{ width: '40px' }} />
            <Title
              className='bookstore-logo-lg'
              level={2}
              onClick={() => history.push('/')}>
              Bookstore
            </Title>
            <DynamicAvatar isSignedIn={true} />
          </div>
        </Col>
      </Row>
    );
  }

  return (
    <Row className='bookstore-header' align='middle' justify='space-between'>
      <Col span={24}>
        <div className='bookstore-header-wrapper'>
          <Title
            className='bookstore-logo-lg'
            level={2}
            onClick={() => history.push('/')}>
            Bookstore
          </Title>
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
          <div style={{ width: '100%' }} />
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
          <Badge
            className='bookstore-cart-icon-badge'
            count={0}
            offset={[-4, 8]}
            showZero>
            <Button
              className='bookstore-cart-button'
              size='large'
              icon={<Cart className='bookstore-cart-icon' />}
            />
          </Badge>
        </div>
      </Col>
    </Row>
  );
}

export default Header;
