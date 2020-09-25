import './Header.less';

import React, { useState } from 'react';

import {
  Row,
  Col,
  Layout,
  Typography,
  Menu,
  AutoComplete,
  Input,
  Button,
} from 'antd';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

function DynamicAvatar(props) {
  const { isSignedIn } = props;

  if (isSignedIn) {
    return (
      <Button type='primary' size='large' shape='circle'>
        AC
      </Button>
    );
  } else {
    return (
      <Button type='primary' size='large'>
        Sign In
      </Button>
    );
  }
}

const hints = [
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
            <Title className='bookstore-logo-lg' level={2}>
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
          </div>
        </Col>
        <Col>
          <div className='bookstore-col-wrapper'>
            <AutoComplete className='bookstore-search-dropdown'>
              <Input.Search
                size='large'
                placeholder={
                  'Try "' +
                  hints[Math.floor(Math.random() * hints.length)] +
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
