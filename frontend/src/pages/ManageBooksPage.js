import './ManageBooksPage.less';

import React from 'react';

import dayjs from 'dayjs';

import { Button, Descriptions, Table, Tag, Tooltip, Typography } from 'antd';

import ManagePage from './ManagePage.js';

const { Paragraph, Text, Title } = Typography;

const colors = {
  all: ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'],
  random: () => colors.all[Math.floor(Math.random() * colors.all.length)],
  get: (i) => colors.all[i],
};

const bookTableColumns = [
  {
    title: 'Title', dataIndex: 'title', key: 'title', fixed: 'left', width: '166px',
    ellipsis: { showTitle: false },
    render: title => (
      <Tooltip placement='topLeft' title={title}>
        {title}
      </Tooltip>
    ),
  },
  {
    title: 'Author(s)', dataIndex: 'authors', key: 'authors', width: '166px',
    ellipsis: { showTitle: false },
    render: authors => (
      <Tooltip placement='topLeft' title={authors.join(', ')}>
        <Text>
          {authors.join(', ')}
        </Text>
      </Tooltip>
    )
  },
  {
    title: 'Publisher', dataIndex: 'publisher', key: 'publisher', width: '210px',
    ellipsis: { showTitle: false },
    render: publisher => (
      <Tooltip placement='topLeft' title={publisher}>
        {publisher}
      </Tooltip>
    ),
  },
  { title: 'Published', dataIndex: 'pubDate', key: 'pubDate', width: '130px' },
  { title: 'ISBN-13', dataIndex: 'isbn', key: 'isbn', width: '166px' },
  {
    title: 'Edition', dataIndex: 'edition', key: 'edition',
    ellipsis: { showTitle: false },
    render: edition => (
      <Tooltip placement='topLeft' title={edition}>
        {edition || <i>N/A</i>}
      </Tooltip>
    ),
  },
  { title: 'Pages', dataIndex: 'pages', key: 'pages', width: '88px' },
  {
    title: 'Categories', dataIndex: 'categories', key: 'categories', width: '200px',
    render: categories => (
      categories.map(cat => (
        <Tag key={cat} color={colors.random()} style={{ margin: '4px 4px'}}>{cat}</Tag>
      ))
    ),
  },
  {
    title: 'Tags', dataIndex: 'tags', key: 'tags', width: '200px',
    render: tags => (
      tags.map(tag => (
        <Tag key={tag} color={colors.random()} style={{ margin: '4px 4px'}}>{tag}</Tag>
      ))
    ),
  },
  {
    title: 'Sell Price', dataIndex: 'sellPrice', key: 'sellPrice',
    render: price => <Text>${price}</Text>,
  },
  {
    title: 'Buy Price', dataIndex: 'buyPrice', key: 'buyPrice',
    render: price => <Text>${price}</Text>,
  },
  { title: 'Stock', dataIndex: 'stock', key: 'stock' },
  { title: 'Min Threshold', dataIndex: 'minThresh', key: 'minThresh', width: '110px' },
  { 
    title: 'Action', key: 'action',
    render: () => (<Button type='link'>EDIT</Button>),
  }
];

const books = [
  {
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
    coverPicPath: 'https://kottke.org/plus/misc/images/obama-promised-land-book.jpg',
    description: 'A riveting, deeply personal account of history in the making from the president who inspired us to believe in the power of democracy. In the stirring, highly anticipated first volume of his presidential memoirs, Barack Obama tells the story of his improbable odyssey from young man searching for his identity to leader of the free world, describing in strikingly personal detail both his political education and the landmark moments of the first term of his historic presidency a time of dramatic transformation and turmoil.',
  },
];

for (let i = 1; i < 1000; i++) {
  books.push({...books[0], id: i, key: i });
}

function BookTable(props) {
  return (
    <Table
      className='bookstore-book-table'
      dataSource={books}
      columns={bookTableColumns}
      scroll={{ x: '160%' }}
      bordered
      expandable={{
        expandRowByClick: true,
        expandedRowRender: (record) => (
          <div>
            <div className='bookstore-book-table-expanded-container'>
              <img
                className='bookstore-book-table-expanded-image'
                src={record.coverPicPath}
                alt={record.title}
              />
              <div className='bookstore-book-table-expanded-text'>
                <Title level={3} style={{ fontWeight: '900', marginBottom: '0px' }}>
                  {record.title}
                </Title>
                <Paragraph>{record.authors.join(', ')}</Paragraph>
                <Tooltip
                  overlayClassName='bookstore-book-table-expanded-description-tooltip'
                  placement='bottomLeft'
                  title={record.description}>
                  <Paragraph ellipsis={{ rows: 4, expandable: false }}>
                    {record.description}
                  </Paragraph>
                </Tooltip>
                <Descriptions
                  className='bookstore-book-table-expanded-details'
                  column={6}
                  size='small'
                  bordered>
                  <Descriptions.Item span={2} label='ISBN-13'>{record.isbn}</Descriptions.Item>
                  <Descriptions.Item span={2} label='Pages'>{record.pages}</Descriptions.Item>
                  <Descriptions.Item span={2} label='Publisher'>
                    {record.publisher}
                  </Descriptions.Item>
                  <Descriptions.Item span={4} label='Published'>
                    {dayjs(record.pubDate).format('MMMM DD, YYYY')}
                  </Descriptions.Item>
                  <Descriptions.Item span={1} label='Buy Price'>
                    ${record.buyPrice}
                  </Descriptions.Item>
                  <Descriptions.Item span={1} label='Stock'>{record.stock}</Descriptions.Item>
                  <Descriptions.Item span={4} label='Edition'>
                    {record.edition || <i>N/A</i>}
                  </Descriptions.Item>
                  <Descriptions.Item span={1} label='Sell Price'>
                    ${record.sellPrice}
                  </Descriptions.Item>
                  <Descriptions.Item span={1} label='Threshold'>
                    {record.minThresh}
                  </Descriptions.Item>
                  <Descriptions.Item span={3} label='Tags'>
                    {record.tags.map(tag => (
                      <Tag key={tag} color={colors.random()} style={{ margin: '4px 4px'}}>
                        {tag}
                      </Tag>
                    ))}
                  </Descriptions.Item>
                  <Descriptions.Item span={3} label='Categories'>
                    {record.categories.map(cat => (
                      <Tag key={cat} color={colors.random()} style={{ margin: '4px 4px'}}>
                        {cat}
                      </Tag>
                    ))}
                  </Descriptions.Item>                  
                </Descriptions>
              </div>
            </div>
            <Button className='bookstore-book-table-expanded-action' type='primary'>
              ARCHIVE
            </Button>
            <Button className='bookstore-book-table-expanded-action'>
              EDIT
            </Button>
          </div>
        ),
      }}>
    </Table>
  );
}

function ManageBooks(props) {
  return (
    <ManagePage
      title='Manage Books'
      shortTitle='Books'
      table={<BookTable />}
    />
  );
}

export default ManageBooks;
