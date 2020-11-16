import React from 'react';

import { Table } from 'antd';

import ManagePage from './ManagePage.js';

function UserTable(props) {
  return <Table />;
}

function ManageUsersPage(props) {
  return (
    <ManagePage title='Manage Users' shortTitle='Users' table={<UserTable />} />
  );
}

export default ManageUsersPage;
