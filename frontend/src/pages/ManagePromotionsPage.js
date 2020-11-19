import './ManagePromotionsPage.less';

import React from 'react';

import { Badge, Button, Descriptions, Table, Tooltip, Typography } from 'antd';

import ManagePage from './ManagePage.js';
import Slider from '../components/Slider.js';

const { Text, Title, Paragraph } = Typography;

const promotionTableColumns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'Code',
    dataIndex: 'promoCode',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    render: (d) => (
      <Tooltip placement='topLeft' title={d}>
        <Text ellipsis={true} style={{ maxWidth: '250px' }}>{d}</Text>
      </Tooltip>
    ),
  },
  {
    title: 'Discount',
    dataIndex: 'discount',
    render: (d) => <Text>{(d * 100)}%</Text>
  },
  {
    title: 'Start Date',
    dataIndex: 'startDate',
  },
  {
    title: 'End Date',
    dataIndex: 'endDate',
  },
  {
    title: 'Status',
    dataIndex: 'emailed',
    render: (e) => (
      <Badge
        status={e ? 'processing' : 'warning'}
        text={e ? 'Active' : 'Idle'}
        className={e ? 'bookstore-promotion-table-status' : ''}
      />
    ),
  },
];

const samplePromo = {
  id: 0,
  key: 0,
  promoCode: 'HOLIDAY20',
  description: '20% off during December holidays.',
  discount: .2,
  startDate: '2020-12-01 00:00:00',
  endDate: '2020-12-31 23:59:59',
  emailed: false,
  books: [],
};

const sampleBook = {
  id: 0,
  key: 0,
  title: 'A Promised Land',
  authors: ['Barack Obama'],
  publisher: 'Crown Publishing Group',
  pubDate: '2020-11-17',
  isbn: '9781524763169',
  edition: '',
  pages: 768,
  categories: ['Autobiography', 'Biography', 'Memoir'],
  tags: ['Bestseller'],
  sellPrice: 32.99,
  buyPrice: 15.99,
  stock: 10000,
  minThresh: 100,
  coverPicPath:
  'https://kottke.org/plus/misc/images/obama-promised-land-book.jpg',
  description:
  'A riveting, deeply personal account of history in the making from the president who inspired us to believe in the power of democracy. In the stirring, highly anticipated first volume of his presidential memoirs, Barack Obama tells the story of his improbable odyssey from young man searching for his identity to leader of the free world, describing in strikingly personal detail both his political education and the landmark moments of the first term of his historic presidency a time of dramatic transformation and turmoil.',
};

const promotions = [];
for (let i = 0; i < 100; i++) {
  const books = [];
  for (let j = 0; j < 20; j++) {
    books.push({ ...sampleBook, id: j, key: j });
  }
  promotions.push({ ...samplePromo, id: i, key: i, emailed: i % 2, books });
}

const nestedBookTableColumns = [
  {
    title: 'Title',
    dataIndex: 'title',
    render: (title) => (
      <Tooltip placement='topLeft' title={title}>
        {title}
      </Tooltip>
    ),
  },
  {
    title: 'Author(s)',
    dataIndex: 'authors',
    render: (authors) => (
      <Tooltip placement='topLeft' title={authors.join(', ')}>
        <Text>{authors.join(', ')}</Text>
      </Tooltip>
    ),
  },
  {
    title: 'ISBN-13',
    dataIndex: 'isbn',
  },
  {
    title: 'Publisher',
    dataIndex: 'publisher',
  },
];

function PromotionTable(props) {
  return (
    <Table
      className='bookstore-promotion-table'
      dataSource={promotions}
      columns={promotionTableColumns}
      scroll={{ x: true }}
      bordered
      expandable={{
        expandRowByClick: true,
        expandedRowRender: (record) => (
          <div className='bookstore-promotion-table-expanded-wrapper'>
            <div className='bookstore-promotion-table-expanded-container'>
              <Title level={3} className='bookstore-promotion-table-expanded-title'>
                {record.promoCode}
              </Title>
              <Tooltip placement='bottomLeft' title={record.description}>
                <Paragraph
                  ellipsis={{ rows: 4 }}
                  style={{ display: 'inline-block', marginBottom: '0px'}}>
                  {record.description}
                </Paragraph>
              </Tooltip>
              <Title level={5}>Promotion Details</Title>
              <Slider backgroundColor='#fbfbfb' style={{ padding: '0px', textAlign: 'unset' }}>
                <div />
                <Descriptions
                  className='bookstore-promotion-table-expanded-descriptions'
                  size='small'
                  column={2}
                  bordered>
                  <Descriptions.Item label='Discount'>
                    {(record.discount * 100)}%
                  </Descriptions.Item>
                  <Descriptions.Item label='Start Date'>{record.startDate}</Descriptions.Item>
                  <Descriptions.Item label='Status'>
                    <Badge
                      status={record.emailed ? 'processing' : 'warning'}
                      text={record.emailed ? 'Active' : 'Idle'}
                      className={record.emailed ? 'bookstore-promotion-table-status' : ''}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item label='End Date'>{record.endDate}</Descriptions.Item>
                </Descriptions>
              </Slider>
              <Title level={5} style={{ marginTop: '16px' }}>Affected Books</Title>
              <Table
                className='bookstore-promotion-table-nested-book-table'
                dataSource={record.books}
                columns={nestedBookTableColumns}
                scroll={{ y: 200, x: true }}
                pagination={false}
                size='small'
                bordered
              />
            </div>
            <Button
              className='bookstore-promotion-table-expanded-action'
              type='primary'
              disabled={record.emailed}>
              EDIT
            </Button>
          </div>
        ),
      }}
    />
  );
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
