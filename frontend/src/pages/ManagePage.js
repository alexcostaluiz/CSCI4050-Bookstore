import './ManagePage.less';

import React from 'react';

import { Link } from 'react-router-dom';

import { Breadcrumb, Button, Col, Modal, Row, Typography } from 'antd';

const { Title } = Typography;

function ManagePage(props) {
  const { form, table, title, shortTitle } = props;

  const showForm = () => {
    Modal.confirm({
      content: form,
      icon: null,
      width: '800px',
      className: 'bookstore-manage-form',
      maskClosable: true,
    });
  };

  return (
    <Row justify='center'>
      <Col span={24} className='bookstore-column'>
        <Breadcrumb className='bookstore-breadcrumb'>
          <Breadcrumb.Item>
            <Link to='/admin'>Admin</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to='/admin'>Manage</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to=''>{shortTitle}</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className='bookstore-page-section'>
          <div className='bookstore-manage-table-container'>
            <div className='bookstore-manage-table-title-container'>
              <Title className='bookstore-manage-table-title'>{title}</Title>
              <Button type='primary' size='large' onClick={showForm}>
                ADD {shortTitle.slice(0, -1).toUpperCase()}
              </Button>
            </div>
            <div className='bookstore-manage-table-wrapper'>{table}</div>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default ManagePage;
