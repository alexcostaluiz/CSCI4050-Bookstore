import React from 'react';

import { Table, Tag, Typography } from 'antd';

import ManagePage from './ManagePage.js';

const { Text } = Typography;

const roleToColor = {
  USER: 'geekblue',
  ADMIN: 'magenta',
};

const userTableColumns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Email Address',
    dataIndex: 'emailAddress',
    key: 'emailAddress',
  },
  {
    title: 'First Name',
    dataIndex: 'firstName',
    key: 'firstName',
  },
  {
    title: 'Last Name',
    dataIndex: 'lastName',
    key: 'lastName',
  },
  {
    title: 'Phone Number',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
  },
  {
    title: 'Subscribed',
    dataIndex: 'subscription',
    key: 'subscription',
    render: (s) => <Text>{s.toString()}</Text>,
  },
  {
    title: 'Employee',
    dataIndex: 'isEmployed',
    key: 'isEmployed',
    render: (e) => <Text>{e.toString()}</Text>,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Roles',
    dataIndex: 'roles',
    key: 'roles',
    render: (roles) =>
      roles.map((r) => (
        <Tag key={r} color={roleToColor[r]} style={{ margin: '4px 4px' }}>
          {r}
        </Tag>
      )),
  },
];

const users = [
  {
    id: 0,
    key: 0,
    emailAddress: 'alexcostluiz@outlook.com',
    firstName: 'Alexander',
    lastName: 'Costa',
    phoneNumber: '4049849898',
    subscription: true,
    isEmployed: false,
    status: 'Active',
    roles: ['USER'],
  },
];

for (let i = 1; i < 100; i++) {
  users.push({ ...users[0], id: i, key: i });
}

function UserTable(props) {
  return (
    <Table
      dataSource={users}
      columns={userTableColumns}
      bordered
      expandable={{
        expandRowByClick: true,
        expandedRowRender: (record) => <div></div>,
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
