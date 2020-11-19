import './ManageUsersPage.less';

import React from 'react';

import { Badge, Button, Descriptions, Modal, Table, Tag, Typography } from 'antd';
import AddressTable from '../components/AddressTable.js';
import CardTable from '../components/CardTable.js';
import ManagePage from './ManagePage.js';
import Slider from '../components/Slider.js';

const { Paragraph, Text, Title } = Typography;

const roleToColor = {
  USER: 'geekblue',
  ADMIN: 'magenta',
};

const statusToBadge = {
  Suspended: 'error',
  Inactive: 'warning',
  Active: 'success',
};

const userTableColumns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'Email Address',
    dataIndex: 'emailAddress',
  },
  {
    title: 'First Name',
    dataIndex: 'firstName',
  },
  {
    title: 'Last Name',
    dataIndex: 'lastName',
  },
  {
    title: 'Phone Number',
    dataIndex: 'phoneNumber',
  },
  {
    title: 'Subscribed',
    dataIndex: 'subscription',
    render: (s) => <Text>{s.toString()}</Text>,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (s) => (
      <Badge status={statusToBadge[s]} text={s} />
    ),
  },
  {
    title: 'Roles',
    dataIndex: 'roles',
    render: (roles) =>
      roles.map((r) => (
        <Tag key={r} color={roleToColor[r]} style={{ margin: '4px 4px' }}>
          {r}
        </Tag>
      )),
  },
];

const sampleUser = {
  id: 0,
  key: 0,
  emailAddress: 'alexcostaluiz@outlook.com',
  firstName: 'Alexander',
  lastName: 'Costa',
  phoneNumber: '4049849898',
  subscription: true,
  status: 'Active',
  roles: ['USER'],
  addresses: [
    {
      id: 0,
      name: 'Alexander Costa',
      address1: '490 Barnett Shoals Rd',
      address2: 'Apt 911',
      city: 'Athens',
      state: 'GA',
      zip: 30605,
      country: 'United States',
      phoneNumber: '4049849898',      
    },
  ],
  savedCards: [
    {
      id: 0,
      cardType: 'discover',
      number: '6011010373940967',
      name: 'Alexander L Costa',
      expiry: '04/22',
      address: {
        id: 0,
        name: 'Alexander Costa',
        address1: '490 Barnett Shoals Rd',
        address2: 'Apt 911',
        city: 'Athens',
        state: 'GA',
        zip: 30605,
        country: 'United States',
        phoneNumber: '4049849898',        
      },
    },
  ],
  orders: [],
  cart: {},
};

const users = [];
for (let i = 0; i < 100; i++) {
  users.push({ ...sampleUser, id: i, key: i });
}

function UserTable(props) {
  const showTableModal = ({content, title}) => {
    Modal.info({
      content: (
        <div>
          <Title level={3} style={{ fontWeight: '900', marginBottom: '24px' }}>
            View {title}
          </Title>
          {content}
        </div>
      ),
      width: '90%',
      style: { maxWidth: '800px' },
      icon: null,
      maskClosable: true,
    });
  };
  
  return (
    <Table
      className='bookstore-user-table'
      dataSource={users}
      columns={userTableColumns}
      scroll={{ x: true }}
      bordered
      expandable={{
        expandRowByClick: true,
        expandedRowRender: (record) => (
          <div className='bookstore-user-table-expanded-wrapper'>
            <div className='bookstore-user-table-expanded-container'>
              <div className='bookstore-user-table-expanded-text'>
                <Button type='primary' size='large' shape='circle'>
                  {String(record.firstName).charAt(0) +
                   String(record.lastName).charAt(0)}
                </Button>
                <div style={{ marginLeft: '16px' }}>
                  <Title className='bookstore-user-table-expanded-title' level={3}>
                    {record.firstName + ' ' + record.lastName}
                  </Title>
                  <Paragraph style={{ marginBottom: '0px' }}>{record.emailAddress}</Paragraph>
                </div>
              </div>
              <Title level={5}>User Details</Title>
              <Slider backgroundColor='#fbfbfb' style={{ padding: '0px', textAlign: 'unset' }}>
                <div />
                <Descriptions
                  className='bookstore-user-table-expanded-details'
                  size='small'
                  column={3}
                  bordered>
                  <Descriptions.Item label='Phone Number'>
                    {record.phoneNumber || <i>N/A</i>}
                  </Descriptions.Item>
                  <Descriptions.Item label='Subscribed'>
                    {record.subscription.toString()}
                  </Descriptions.Item>
                  <Descriptions.Item label='Status'>
                    {<Badge status={statusToBadge[record.status]} text={record.status} />}
                  </Descriptions.Item>
                  <Descriptions.Item label='Cart'>
                    <Button
                      type='link'
                      onClick={() => showTableModal({
                        content: <Text>N/A</Text>,
                        title: 'Cart (' + record.emailAddress + ')',
                      })}>
                      View
                    </Button>
                  </Descriptions.Item>
                  <Descriptions.Item label='Cards'>
                    <Button
                      type='link'
                      onClick={() => {
                        showTableModal({
                          content: <CardTable cards={record.savedCards}/>,
                          title: 'Cards (' + record.emailAddress + ')',
                        });
                      }}>
                      View
                    </Button>
                  </Descriptions.Item>
                  <Descriptions.Item label='Addresses'>
                    <Button
                      type='link'
                      onClick={() => {
                        showTableModal({
                          content: <AddressTable addresses={record.addresses}/>,
                          title: 'Addresses (' + record.emailAddress + ')',
                        });
                      }}>
                      View
                    </Button>
                  </Descriptions.Item>
                  <Descriptions.Item label='Orders'>
                    <Button
                      type='link'
                      onClick={() => (
                        showTableModal({
                          content: <Text>N/A</Text>,
                          title: 'Orders (' + record.emailAddress + ')',
                        })
                      )}>
                      View
                    </Button>
                  </Descriptions.Item>
                  <Descriptions.Item span={2} label='Roles'>
                    {record.roles.map((r) => (
                      <Tag key={r} color={roleToColor[r]} style={{ margin: '4px 4px' }}>
                        {r}
                      </Tag>
                    ))}
                  </Descriptions.Item> 
                </Descriptions>
              </Slider>
            </div>
            <Button
              className='bookstore-user-table-expanded-action'
              type='primary'>
              EDIT
            </Button>
          </div>
        ),
      }}
    />
  );
}

function ManageUsersPage(props) {
  return (
    <ManagePage title='Manage Users' shortTitle='Users' table={<UserTable />} />
  );
}

export default ManageUsersPage;
