import './ManageBooksPage.less';

import React from 'react';

import dayjs from 'dayjs';

import { Button, Descriptions, Table, Tag, Tooltip, Typography } from 'antd';

import BookForm from '../components/BookForm.js';
import DB from '../services/DatabaseService.js';
import ManagePage from './ManagePage.js';
import Slider from '../components/Slider.js';

const { Paragraph, Text, Title } = Typography;

const colors = {
  all: [
    'magenta',
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
    'purple',
  ],
  random: () => colors.all[Math.floor(Math.random() * colors.all.length)],
  get: (i) => colors.all[i],
};

const bookTableColumns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    render: (title) => (
      <Tooltip placement='topLeft' title={title}>
        <Text style={{ maxWidth: '200px' }} ellipsis={true}>{title}</Text>
      </Tooltip>
    ),
  },
  {
    title: 'Author(s)',
    dataIndex: 'authors',
    render: (authors) => (
      <Tooltip placement='topLeft' title={authors.join(', ')}>
        <Text style={{ maxWidth: '200px' }} ellipsis={true}>{authors.join(', ')}</Text>
      </Tooltip>
    ),
  },
  {
    title: 'Publisher',
    dataIndex: 'publisher',
    render: (publisher) => (
      <Tooltip placement='topLeft' title={publisher}>
        <Text style={{ maxWidth: '200px' }} ellipsis={true}>{publisher}</Text>
      </Tooltip>
    ),
  },
  { title: 'Published', dataIndex: 'pubDate' },
  { title: 'ISBN-13', dataIndex: 'isbn' },
  {
    title: 'Edition',
    dataIndex: 'edition',
    render: (edition) => (
      <Tooltip placement='topLeft' title={edition}>
        <Text style={{ maxWidth: '200px' }} ellipsis={true}>
          {edition || <i>N/A</i>}
        </Text>
      </Tooltip>
    ),
  },
  { title: 'Pages', dataIndex: 'pages' },
  {
    title: 'Categories',
    dataIndex: 'categories',
    render: (categories) =>
      categories.map((cat) => (
        <Tag key={cat} color={colors.random()} style={{ margin: '4px 4px' }}>
          {cat}
        </Tag>
      )),
  },
  {
    title: 'Tags',
    dataIndex: 'tags',
    render: (tags) =>
      tags.map((tag) => (
        <Tag key={tag} color={colors.random()} style={{ margin: '4px 4px' }}>
          {tag}
        </Tag>
      )),
  },
  {
    title: 'Sell Price',
    dataIndex: 'sellPrice',
    render: (price) => <Text>${price}</Text>,
  },
  {
    title: 'Buy Price',
    dataIndex: 'buyPrice',
    render: (price) => <Text>${price}</Text>,
  },
  { title: 'Stock', dataIndex: 'stock' },
  {
    title: 'Min Threshold',
    dataIndex: 'minThresh',
  },
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
    coverPicPath:
    'https://kottke.org/plus/misc/images/obama-promised-land-book.jpg',
    description:
    'A riveting, deeply personal account of history in the making from the president who inspired us to believe in the power of democracy. In the stirring, highly anticipated first volume of his presidential memoirs, Barack Obama tells the story of his improbable odyssey from young man searching for his identity to leader of the free world, describing in strikingly personal detail both his political education and the landmark moments of the first term of his historic presidency a time of dramatic transformation and turmoil.',
  },
];

for (let i = 1; i < 1000; i++) {
  books.push({ ...books[0], id: i, key: i });
}

function BookTable(props) {
  return (
    <Table
      className='bookstore-book-table'
      dataSource={books}
      columns={bookTableColumns}
      scroll={{ x: true }}
      bordered
      expandable={{
        expandRowByClick: true,
        expandedRowRender: (record) => (
          <div className='bookstore-book-table-expanded-wrapper'>
            <div className='bookstore-book-table-expanded-container'>
              <div className='bookstore-book-table-expanded-text'>
                <img
                  className='bookstore-book-table-expanded-image'
                  src={record.coverPicPath}
                  alt={record.title}
                />
                <div>
                  <Title
                    level={3}
                    style={{ fontWeight: '900', marginBottom: '0px' }}>
                    {record.title}
                  </Title>
                  <Paragraph>{record.authors.join(', ')}</Paragraph>
                  <Tooltip
                    overlayClassName='bookstore-book-table-expanded-description-tooltip'
                    placement='bottomLeft'
                    title={record.description}>
                    <Paragraph ellipsis={{ rows: 4 }}>
                      {record.description}
                    </Paragraph>
                  </Tooltip>
                </div>
              </div>
              <Title level={5}>Book Details</Title>
              <Slider backgroundColor='#fbfbfb' style={{ padding: '0px' }}>
                <div></div>
                <Descriptions
                  className='bookstore-book-table-expanded-details'
                  column={6}
                  size='small'
                  bordered>
                  <Descriptions.Item span={2} label='ISBN-13'>
                    {record.isbn}
                  </Descriptions.Item>
                  <Descriptions.Item span={2} label='Pages'>
                    {record.pages}
                  </Descriptions.Item>
                  <Descriptions.Item span={2} label='Publisher'>
                    {record.publisher}
                  </Descriptions.Item>
                  <Descriptions.Item span={4} label='Published'>
                    {dayjs(record.pubDate).format('MMMM DD, YYYY')}
                  </Descriptions.Item>
                  <Descriptions.Item span={1} label='Buy Price'>
                    ${record.buyPrice}
                  </Descriptions.Item>
                  <Descriptions.Item span={1} label='Stock'>
                    {record.stock}
                  </Descriptions.Item>
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
                    {record.tags.map((tag) => (
                      <Tag
                        key={tag}
                        color={colors.random()}
                        style={{ margin: '4px 4px' }}>
                        {tag}
                      </Tag>
                    ))}
                  </Descriptions.Item>
                  <Descriptions.Item span={3} label='Categories'>
                    {record.categories.map((cat) => (
                      <Tag
                        key={cat}
                        color={colors.random()}
                        style={{ margin: '4px 4px' }}>
                        {cat}
                      </Tag>
                    ))}
                  </Descriptions.Item>
                </Descriptions>
              </Slider>
            </div>
            <Button
              className='bookstore-book-table-expanded-action'
              type='primary'>
              ARCHIVE
            </Button>
            <Button className='bookstore-book-table-expanded-action'>
              EDIT
            </Button>
          </div>
        ),
      }}></Table>
  );
}

function ManageBooks(props) {
  return (
    <ManagePage
      title='Manage Books'
      shortTitle='Books'
      table={<BookTable />}
      form={<BookForm addBook={(values) => DB.createBook(values)}/>}
    />
  );
}

export default ManageBooks;
