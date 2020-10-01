import './AdminPage.less';

import React from 'react';

import { Col, Row, Typography } from 'antd';

const { Title } = Typography;

function AdminPage(props) {
  return (
    <Row>
      <Col className='bookstore-column' span={24}>
        <Title className='bookstore-admin-welcome'>Welcome, Alex.</Title>
        <div className='bookstore-admin-module-container'>
          <div className='bookstore-admin-module'>
            <Title className='bookstore-admin-module-title'>Manage Books</Title>
          </div>
          <div className='bookstore-admin-module'>
            <Title className='bookstore-admin-module-title'>Manage Users</Title>
          </div>
          <div className='bookstore-admin-module'>
            <Title className='bookstore-admin-module-title'>Manage Promotions</Title>
          </div>

        </div>
      </Col>
    </Row>
  );
}

export default AdminPage;
