import './AdminPage.less';

import React, { useContext } from 'react';

import { useHistory } from 'react-router-dom';

import { Col, Row, Typography } from 'antd';

import { BookOutlined, UserOutlined, TagsOutlined } from '@ant-design/icons';

import AuthContext from '../contexts/AuthContext.js';

const { Title } = Typography;

function AdminPage(props) {
  const auth = useContext(AuthContext);

  const history = useHistory();

  const goTo = (path) => {
    history.push(path);
  };

  return (
    <Row>
      <Col className='bookstore-column' span={24}>
        {auth.user && auth.user.id ? (
          <Title className='bookstore-admin-welcome'>
            Welcome, {auth.user.firstName}!
          </Title>
        ) : null}
        <div className='bookstore-admin-module-container'>
          <div
            className='bookstore-admin-module'
            onClick={() => goTo('/admin/manage/books')}>
            <BookOutlined className='bookstore-admin-module-icon' />
            <Title className='bookstore-admin-module-title'>
              Manage
              <br />
              Books
            </Title>
          </div>
          <div
            className='bookstore-admin-module'
            onClick={() => goTo('/admin/manage/users')}>
            <UserOutlined className='bookstore-admin-module-icon' />
            <Title className='bookstore-admin-module-title'>
              Manage
              <br />
              Users
            </Title>
          </div>
          <div
            className='bookstore-admin-module'
            onClick={() => goTo('/admin/manage/promotions')}>
            <TagsOutlined className='bookstore-admin-module-icon' />
            <Title className='bookstore-admin-module-title'>
              Manage
              <br />
              Promotions
            </Title>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default AdminPage;
