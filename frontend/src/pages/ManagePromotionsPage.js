import './ManagePromotionsPage.less';

import React, { useEffect, useState } from 'react';

import { Badge, Button, Descriptions, Modal, Table, Tooltip, Typography } from 'antd';

import moment from 'moment';

import DB from '../services/DatabaseService.js';
import ManagePage from './ManagePage.js';
import PromotionForm from '../components/PromotionForm.js';
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
        <Text ellipsis={true} style={{ maxWidth: '250px' }}>
          {d}
        </Text>
      </Tooltip>
    ),
  },
  {
    title: 'Discount',
    dataIndex: 'discount',
    render: (d) => <Text>{d * 100}%</Text>,
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
  const {
    promotions,
    onActivate = () => {},
    onDelete = () => {},
    onEdit = () => {},
  } = props;
  
  return (
    <Table
      className='bookstore-promotion-table'
      dataSource={promotions}
      columns={promotionTableColumns}
      loading={promotions === null}
      scroll={{ x: true }}
      bordered
      expandable={{
        expandRowByClick: true,
        expandedRowRender: (record) => (
          <div className='bookstore-promotion-table-expanded-wrapper'>
            <div className='bookstore-promotion-table-expanded-container'>
              <Title
                level={3}
                className='bookstore-promotion-table-expanded-title'>
                {record.promoCode}
              </Title>
              <Tooltip placement='bottomLeft' title={record.description}>
                <Paragraph
                  ellipsis={{ rows: 4 }}
                  style={{ display: 'inline-block', marginBottom: '0px' }}>
                  {record.description}
                </Paragraph>
              </Tooltip>
              <Title level={5}>Promotion Details</Title>
              <Slider
                backgroundColor='#fbfbfb'
                style={{ padding: '0px', textAlign: 'unset' }}>
                <div />
                <Descriptions
                  className='bookstore-promotion-table-expanded-descriptions'
                  size='small'
                  column={2}
                  bordered>
                  <Descriptions.Item label='Discount'>
                    {record.discount * 100}%
                  </Descriptions.Item>
                  <Descriptions.Item label='Start Date'>
                    {record.startDate}
                  </Descriptions.Item>
                  <Descriptions.Item label='Status'>
                    <Badge
                      status={record.emailed ? 'processing' : 'warning'}
                      text={record.emailed ? 'Active' : 'Idle'}
                      className={
                        record.emailed ? 'bookstore-promotion-table-status' : ''
                      }
                    />
                  </Descriptions.Item>
                  <Descriptions.Item label='End Date'>
                    {record.endDate}
                  </Descriptions.Item>
                </Descriptions>
              </Slider>
              <Title level={5} style={{ marginTop: '16px' }}>
                Affected Books
              </Title>
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
              disabled={record.emailed}
              onClick={() => onActivate(record)}>
              ACTIVATE
            </Button>
            <Button
              className='bookstore-promotion-table-expanded-action'
              disabled={record.emailed}
              onClick={() => onDelete(record)}>
              DELETE
            </Button>
            <Button
              className='bookstore-promotion-table-expanded-action'
              disabled={record.emailed}
              onClick={() => onEdit(record)}>
              EDIT
            </Button>
          </div>
        ),
      }}
    />
  );
}

function ManagePromotionsPage(props) {
  const [promotions, setPromotions] = useState(null);

  const retrievePromotions = async () => {
    const promotions = await DB.retrievePromotions();
    promotions.forEach(b => {
      b.key = b.id;
    });
    setPromotions(promotions);    
  };
  
  useEffect(() => {
    retrievePromotions();
  }, []);
  
  const createPromotion = async (values) => {
    const response = await DB.createPromotion(values);
    retrievePromotions();
    return response;
  };

  const updatePromotion = async (values) => {
    const response = await DB.updatePromotion(values);
    retrievePromotions();
    return response;
  };

  const deletePromotion = async (values) => {
    const response = await DB.deletePromotion(values);
    retrievePromotions();
    return response;
  };

  const activatePromotion = async (values) => {
    const response =  await DB.activatePromotion(values);
    retrievePromotions();
    return response;
  };
  
  const showForm = (onSubmit, title, initialValues) => {
    const initialValuesCopy = {...initialValues};
    if (initialValues) {
      initialValuesCopy.startDate = moment(initialValues.startDate);
      initialValuesCopy.endDate = moment(initialValues.endDate);
    }
    
    Modal.confirm({
      content: (
        <PromotionForm
          onSubmit={onSubmit}
          initialValues={initialValuesCopy}
          title={title}
        />
      ),
      icon: null,
      width: '800px',
      className: 'bookstore-manage-form',
      maskClosable: true,
    });
  };
  
  return (
    <ManagePage
      title='Manage Promotions'
      shortTitle='Promotions'
      table={(
        <PromotionTable
          promotions={promotions}
          onEdit={(promotion) => showForm(updatePromotion, 'Edit Promotion', promotion)}
          onDelete={deletePromotion}
          onActivate={activatePromotion}
        />
      )}
      showForm={() => showForm(createPromotion, 'Add Promotion')}
    />
  );
}

export default ManagePromotionsPage;
