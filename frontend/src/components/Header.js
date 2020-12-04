import './Header.less';

import React, { useContext, useState } from 'react';

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

import CartContext from '../contexts/CartContext.js';
import DynamicAvatar from './DynamicAvatar.js';

const { Paragraph, Title } = Typography;

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
  const cart = useContext(CartContext);

  const convert = (b) => {
    const label = (
      <div className='bookstore-cart-item'>
        <img
          className='bookstore-cart-item-image'
          src={
            b.coverPic
              ? 'data:image/*;base64,' + b.coverPic
              : 'https://i.stack.imgur.com/1hvpD.jpg'
          }
          alt={b.title}
          style={{ height: '75px', objectFit: 'contain', width: 'unset' }}
        />
        <div className='bookstore-cart-item-details'>
          <Title className='bookstore-cart-item-title' level={4}>
            {b.title}
          </Title>
          <Paragraph>by {b.authors[0].name}</Paragraph>
        </div>
      </div>
    );
    return { value: String(b.id), label };
  };

  const [options, setOptions] = useState(null);
  const [results, setResults] = useState(null);

  const onlyTitle =
    location.pathname.startsWith('/login') ||
    location.pathname.startsWith('/register') ||
    location.pathname.startsWith('/forgotPassword') ||
    location.pathname.startsWith('/updatePassword');

  const simple =
    onlyTitle ||
    location.pathname.startsWith('/checkout') ||
    location.pathname.startsWith('/admin');

  const handleClick = (e) => {
    setCurrent(e.key);
    if (e.key === 'browse' && !location.pathname.startsWith('/browse')) {
      history.push('/browse');
    } else if (e.key === 'home' && location.pathname !== '/') {
      history.push('/');
    }
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
            {onlyTitle ? (
              <div style={{ width: '40px' }} />
            ) : (
              <DynamicAvatar isSignedIn={true} />
            )}
          </div>
        </Col>
      </Row>
    );
  }

  const onSelect = (e) => {
    history.push('/b/' + e);
  };

  const handleSearch = async (query) => {
    const response = await fetch(
      `/books/get?filter=title <> "${query}" , isbn <> "${query}" , categories <> "${query}" , author <> "${query}"`
    );
    const json = await response.json();
    setResults(json);
    setOptions(json.map((e) => convert(e)));
  };

  const displaySearchResults = async (query) => {
    history.push({
      pathname: '/search',
      state: {query: query, books: results},
    });
  };

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
          </Menu>
          <AutoComplete
            className='bookstore-search-dropdown'
            options={options}
            onSelect={onSelect}
            onSearch={handleSearch}>
            <Input.Search
              size='large'
              placeholder={
                'Try "' +
                searchHints[Math.floor(Math.random() * searchHints.length)] +
                '"'
              }
              onSearch={displaySearchResults}
            />
          </AutoComplete>
          <DynamicAvatar isSignedIn={true} />
          <Badge
            className='bookstore-cart-icon-badge'
            count={cart.get().length}
            offset={[-4, 8]}
            showZero>
            <Button
              className='bookstore-cart-button'
              size='large'
              icon={<Cart className='bookstore-cart-icon' />}
              onClick={() => history.push('/cart')}
            />
          </Badge>
        </div>
      </Col>
    </Row>
  );
}

export default Header;
