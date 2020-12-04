import './OrderHistory.less';

import React, { useContext } from 'react';

import { useHistory } from 'react-router-dom';

import { Breadcrumb, Button, Col, Row, Table, Typography } from 'antd';

import AuthContext from '../contexts/AuthContext.js';

const { Text, Title } = Typography;

function OrderHistory(props) {
  const auth = useContext(AuthContext);

  const history = useHistory();
  
  const orderTableColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Date',
      dataIndex: 'orderDate',
    },
    {
      title: 'Shipping To',
      dataIndex: 'address',
      render: (a) => (
        <Text>
          {a.address1 +
           (a.address2 ? ' ' + a.address2 : '') +
           ', ' +
           a.city +
           ', ' +
           a.state +
           ', ' +
           a.zip +
           ' ' +
           a.country
          }
        </Text>
      ),
    },
    {
      title: 'Payment',
      dataIndex: 'payment',
      render: (c) => (
        <Text>
          <b>{c.cardType.charAt(0).toUpperCase() + c.cardType.slice(1)}</b>
          {' ending in '}
          {c.number.slice(-4)}
        </Text>
      )},
    {
      title: 'Promo Code',
      dataIndex: 'promo',
      render: (p) => <Text>{p ? p : <i>N/A</i>}</Text>,
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'action',
      render: (id) => (
        <Button type='link' onClick={() => history.push(`/o/${id}`)}>
          More
        </Button>
      ),
    },
  ];
  
  return (
    <Row justify='center'>
      <Col span={24} className='bookstore-column'>
        <Breadcrumb className='bookstore-breadcrumb'>
          <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
          <Breadcrumb.Item href='#'>
            Order History
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className='bookstore-page-section'>
          <div className='bookstore-order-history-container'>
            <Title style={{ fontWeight: '900' }}>Order History</Title>
            <Table
              columns={orderTableColumns}
              dataSource={auth.user.orders}
              scroll={{ x: true }}
              onRow={(record, rowIndex) => ({
                onClick: e => history.push(`/o/${record.id}`)
              })}
              bordered
            />
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default OrderHistory;
