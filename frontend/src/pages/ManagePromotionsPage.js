import React from 'react';

import { Table } from 'antd';

import ManagePage from './ManagePage.js';

function PromotionTable(props) {
  return <Table />;
}

function ManagePromotionsPage(props) {
  return (
    <ManagePage
      title='Manage Promotions'
      shortTitle='Promotions'
      table={<PromotionTable />}
    />
  );
}

export default ManagePromotionsPage;
