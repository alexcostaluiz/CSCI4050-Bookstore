import './ManageBooksPage.less';

import React, { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import moment from 'moment';

import { Button, Descriptions, Modal, Table, Tag, Tooltip, Typography } from 'antd';

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
        <Text style={{ maxWidth: '200px' }} ellipsis={true}>
          {title}
        </Text>
      </Tooltip>
    ),
  },
  {
    title: 'Author(s)',
    dataIndex: 'authors',
    render: (authors) => (
      <Tooltip placement='topLeft' title={authors.join(', ')}>
        <Text style={{ maxWidth: '200px' }} ellipsis={true}>
          {authors.join(', ')}
        </Text>
      </Tooltip>
    ),
  },
  {
    title: 'Publisher',
    dataIndex: 'publisher',
    render: (publisher) => (
      <Tooltip placement='topLeft' title={publisher}>
        <Text style={{ maxWidth: '200px' }} ellipsis={true}>
          {publisher}
        </Text>
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
  { title: 'Min Threshold', dataIndex: 'minThresh' },
  { title: 'Archived', dataIndex: 'archived', render: (a) => <Text>{a.toString()}</Text> },
];

function BookTable(props) {
  const { books, onArchive = () => {}, onEdit = () => {} } = props;
  
  return (
    <Table
      className='bookstore-book-table'
      dataSource={books}
      columns={bookTableColumns}
      scroll={{ x: true }}
      loading={books === null}
      bordered
      expandable={{
        expandRowByClick: true,
        expandedRowRender: (record) => (
          <div className='bookstore-book-table-expanded-wrapper'>
            <div className='bookstore-book-table-expanded-container'>
              <div className='bookstore-book-table-expanded-text'>
                <img
                  className='bookstore-book-table-expanded-image'
                  src={
                    record.coverPicPath ?
                      'data:image/*;base64,' + record.coverPicPath :
                      'https://i.stack.imgur.com/1hvpD.jpg'
                  }
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
                    <Paragraph ellipsis={{ rows: 4 }} style={{ whiteSpace: 'pre-wrap' }}>
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
              type='primary'
              onClick={() => onArchive(record, record.archived)}>
              {record.archived && 'UN'}ARCHIVE
            </Button>
            <Button
              className='bookstore-book-table-expanded-action'
              onClick={() => onEdit(record)}>
              EDIT
            </Button>
          </div>
        ),
      }}
    />
  );
}

function ManageBooksPage(props) {
  const [books, setBooks] = useState(null);

  const retrieveBooks = async () => {
    const books = await DB.retrieveBooks();
    books.forEach(b => {
      b.key = b.id;
    });
    setBooks(books);    
  };
  
  useEffect(() => {
    retrieveBooks();
  }, []);
  
  const createBook = async (values) => {
    const response = await DB.createBook(values);
    retrieveBooks();
    return response;
  };

  const updateBook = async (values) => {
    const response = await DB.updateBook(values);
    retrieveBooks();
    return response;
  };

  const archiveBook = async (values, isArchived) => {
    const response = isArchived ? await DB.unarchiveBook(values) : await DB.archiveBook(values);
    retrieveBooks();
    return response;
  };
  
  const showForm = (onSubmit, title, initialValues) => {
    const initialValuesCopy = {...initialValues};
    if (initialValues) {
      initialValuesCopy.pubDate = moment(initialValues.pubDate);
      initialValuesCopy.authors = initialValues.authors.map(a => ({name: a}));
      if (initialValues.coverPicPath) {
        initialValuesCopy.coverPicPath = [
          {
            uid: 0,
            name: 'image',
            status: 'done',
            url: 'data:image/*;base64,' + initialValues.coverPicPath
          }
        ];
      }
    }
    Modal.confirm({
      content: <BookForm onSubmit={onSubmit} initialValues={initialValuesCopy} title={title} />,
      icon: null,
      width: '800px',
      className: 'bookstore-manage-form',
      maskClosable: true,
    });
  };

  return (
    <ManagePage
      title='Manage Books'
      shortTitle='Books'
      table={(
        <BookTable
          books={books}
          onEdit={(book) => showForm(updateBook, 'Edit Book', book)}
          onArchive={archiveBook}
        />
      )}
      showForm={() => showForm(createBook, 'Add Book')}
    />
  );
}

export default ManageBooksPage;
