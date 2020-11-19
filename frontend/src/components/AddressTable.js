import './AddressTable.less';

import React from 'react';

import { Table } from 'antd';

import Address from './Address.js';

function AddressTable(props) {
  const { addresses, expandedAction } = props;

  const dataSource = addresses.map((a) => ({
    ...a,
    address:
      a.address1 +
      (a.address2 ? ' ' + a.address2 : '') +
      ', ' +
      a.city +
      ', ' +
      a.state +
      ', ' +
      a.zip +
      ' ' +
      a.country,
    key: a.id,
  }));

  const addressColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return (
    <Table
      className='bookstore-address-table'
      dataSource={dataSource}
      columns={addressColumns}
      scroll={{ x: true }}
      bordered
      expandable={{
        expandRowByClick: true,
        expandedRowRender: (record) => (
          <div className='bookstore-address-table-expanded-container'>
            <Address {...record} />
            {expandedAction ? expandedAction(record) : null}
          </div>
        ),
      }}
    />
  );
}

export default AddressTable;
