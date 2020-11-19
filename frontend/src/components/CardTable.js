import './CardTable.less';

import React from 'react';

import { Table, Typography } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';

import Address from './Address.js';

const { Paragraph, Text, Title } = Typography;

function CardTable(props) {
  const { cards, expandedAction } = props;

  const dataSource = cards.map((c) => ({
    ...c,
    description:
      c.cardType.charAt(0).toUpperCase() +
      c.cardType.slice(1) +
      ' ending in ' +
      c.number.slice(-4),
    key: c.id,
  }));

  const cardColumns = [
    {
      title: 'Your Credit and Debit Cards',
      dataIndex: 'description',
      key: 'description',
    },
    { title: 'Expires', dataIndex: 'expiry', key: 'expiry' },
  ];

  return (
    <Table
      className='bookstore-credit-card-table'
      dataSource={dataSource}
      columns={cardColumns}
      scroll={{ x: true }}
      bordered
      expandable={{
        expandRowByClick: true,
        expandedRowRender: (record) => (
          <div>
            <div className='bookstore-credit-card-table-expanded-container'>
              <div>
                <Title level={5}>Name on Card</Title>
                <Paragraph>{record.name}</Paragraph>
              </div>
              <div>
                <Title level={5}>Billing Address</Title>
                {record.address ? (
                  <Address {...record.address} />
                ) : (
                  [
                    <ExclamationCircleFilled key='icon' />,
                    <Text
                      key='text'
                      style={{ color: '#FF1053', paddingLeft: '8px' }}>
                      Missing billing address
                    </Text>,
                  ]
                )}
              </div>
            </div>
            {expandedAction ? expandedAction(record) : null}
          </div>
        ),
      }}
    />
  );
}

export default CardTable;
