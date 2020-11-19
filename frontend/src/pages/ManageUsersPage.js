import './ManageUsersPage.less';

import React, { useEffect, useState } from 'react';

import {
  Badge,
  Button,
  Descriptions,
  Modal,
  Table,
  Tag,
  Typography,
} from 'antd';

import AddressTable from '../components/AddressTable.js';
import CardTable from '../components/CardTable.js';
import DB from '../services/DatabaseService.js';
import ManagePage from './ManagePage.js';
import Slider from '../components/Slider.js';
import UserForm from '../components/UserForm.js';

const { Paragraph, Text, Title } = Typography;

const roleToColor = {
  USER: 'geekblue',
  ADMIN: 'magenta',
};

const statusToBadge = {
  Suspended: 'error',
  Inactive: 'warning',
  Active: 'success',
};

const userTableColumns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'Email Address',
    dataIndex: 'emailAddress',
  },
  {
    title: 'First Name',
    dataIndex: 'firstName',
  },
  {
    title: 'Last Name',
    dataIndex: 'lastName',
  },
  {
    title: 'Phone Number',
    dataIndex: 'phoneNumber',
  },
  {
    title: 'Subscribed',
    dataIndex: 'subscription',
    render: (s) => <Text>{s.toString()}</Text>,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (s) => <Badge status={statusToBadge[s]} text={s} />,
  },
  {
    title: 'Roles',
    dataIndex: 'roles',
    render: (roles) =>
      roles.map((r) => (
        <Tag key={r} color={roleToColor[r]} style={{ margin: '4px 4px' }}>
          {r}
        </Tag>
      )),
  },
];

function UserTable(props) {
  const {
    onDelete = () => {},
    onEdit = () => {},
    onPromote = () => {},
    onSuspend = () => {},
    users,
  } = props;

  const showTableModal = ({ content, title }) => {
    Modal.info({
      content: (
        <div>
          <Title level={3} style={{ fontWeight: '900', marginBottom: '24px' }}>
            View {title}
          </Title>
          {content}
        </div>
      ),
      width: '90%',
      style: { maxWidth: '800px' },
      icon: null,
      maskClosable: true,
    });
  };

  return (
    <Table
      className='bookstore-user-table'
      dataSource={users}
      columns={userTableColumns}
      scroll={{ x: true }}
      loading={users === null}
      bordered
      expandable={{
        expandRowByClick: true,
        expandedRowRender: (record) => (
          <div className='bookstore-user-table-expanded-wrapper'>
            <div className='bookstore-user-table-expanded-container'>
              <div className='bookstore-user-table-expanded-text'>
                <Button type='primary' size='large' shape='circle'>
                  {String(record.firstName).charAt(0) +
                    String(record.lastName).charAt(0)}
                </Button>
                <div style={{ marginLeft: '16px' }}>
                  <Title
                    className='bookstore-user-table-expanded-title'
                    level={3}>
                    {record.firstName + ' ' + record.lastName}
                  </Title>
                  <Paragraph style={{ marginBottom: '0px' }}>
                    {record.emailAddress}
                  </Paragraph>
                </div>
              </div>
              <Title level={5}>User Details</Title>
              <Slider
                backgroundColor='#fbfbfb'
                style={{ padding: '0px', textAlign: 'unset' }}>
                <div />
                <Descriptions
                  className='bookstore-user-table-expanded-details'
                  size='small'
                  column={3}
                  bordered>
                  <Descriptions.Item label='Phone Number'>
                    {record.phoneNumber || <i>N/A</i>}
                  </Descriptions.Item>
                  <Descriptions.Item label='Subscribed'>
                    {record.subscription.toString()}
                  </Descriptions.Item>
                  <Descriptions.Item label='Status'>
                    {
                      <Badge
                        status={statusToBadge[record.status]}
                        text={record.status}
                      />
                    }
                  </Descriptions.Item>
                  <Descriptions.Item label='Cart'>
                    <Button
                      type='link'
                      onClick={() =>
                        showTableModal({
                          content: <Text>N/A</Text>,
                          title: 'Cart (' + record.emailAddress + ')',
                        })
                      }>
                      View
                    </Button>
                  </Descriptions.Item>
                  <Descriptions.Item label='Cards'>
                    <Button
                      type='link'
                      onClick={() => {
                        showTableModal({
                          content: <CardTable cards={record.savedCards} />,
                          title: 'Cards (' + record.emailAddress + ')',
                        });
                      }}>
                      View
                    </Button>
                  </Descriptions.Item>
                  <Descriptions.Item label='Addresses'>
                    <Button
                      type='link'
                      onClick={() => {
                        showTableModal({
                          content: (
                            <AddressTable addresses={record.addresses} />
                          ),
                          title: 'Addresses (' + record.emailAddress + ')',
                        });
                      }}>
                      View
                    </Button>
                  </Descriptions.Item>
                  <Descriptions.Item label='Orders'>
                    <Button
                      type='link'
                      onClick={() =>
                        showTableModal({
                          content: <Text>N/A</Text>,
                          title: 'Orders (' + record.emailAddress + ')',
                        })
                      }>
                      View
                    </Button>
                  </Descriptions.Item>
                  <Descriptions.Item span={2} label='Roles'>
                    {record.roles.map((r) => (
                      <Tag
                        key={r}
                        color={roleToColor[r]}
                        style={{ margin: '4px 4px' }}>
                        {r}
                      </Tag>
                    ))}
                  </Descriptions.Item>
                </Descriptions>
              </Slider>
            </div>
            <Button
              className='bookstore-user-table-expanded-action'
              type='primary'
              disabled={record.status === 'Inactive'}
              onClick={
                record.roles.includes('ADMIN') ||
                record.roles.includes('EMPLOYEE')
                  ? () => onPromote(record, record.roles.includes('ADMIN'))
                  : () => onSuspend(record, record.status === 'Suspended')
              }>
              {record.roles.includes('ADMIN') ||
              record.roles.includes('EMPLOYEE')
                ? record.roles.includes('ADMIN')
                  ? 'DEMOTE'
                  : 'PROMOTE'
                : record.status === 'Suspended'
                ? 'UNSUSPEND'
                : 'SUSPEND'}
            </Button>
            <Button
              className='bookstore-user-table-expanded-action'
              onClick={() => onDelete(record)}>
              DELETE
            </Button>
            <Button
              className='bookstore-user-table-expanded-action'
              onClick={() => onEdit(record)}>
              EDIT
            </Button>
          </div>
        ),
      }}
    />
  );
}

function ManageUsersPage(props) {
  const [users, setUsers] = useState(null);

  const retrieveUsers = async () => {
    const users = await DB.retrieveUsers();
    users.forEach((b) => {
      b.key = b.id;
    });
    setUsers(users);
  };

  useEffect(() => {
    retrieveUsers();
  }, []);

  const createUser = async (values) => {
    const response = await DB.createUser(values);
    retrieveUsers();
    return response;
  };

  const updateUser = async (values) => {
    const response = await DB.updateUser(values);
    retrieveUsers();
    return response;
  };

  const deleteUser = async (values) => {
    const response = await DB.deleteUser(values);
    retrieveUsers();
    return response;
  };

  const promoteUser = async (values, isPromoted) => {
    const response = isPromoted
      ? await DB.demoteUser(values)
      : await DB.promoteUser(values);
    retrieveUsers();
    return response;
  };

  const suspendUser = async (values, isSuspended) => {
    const response = isSuspended
      ? await DB.unsuspendUser(values)
      : await DB.suspendUser(values);
    retrieveUsers();
    return response;
  };

  const showForm = (onSubmit, title, initialValues) => {
    const initialValuesCopy = { ...initialValues };
    if (initialValues) {
    }

    Modal.confirm({
      content: (
        <UserForm
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
      title='Manage Users'
      shortTitle='Users'
      table={
        <UserTable
          users={users}
          onEdit={(user) => showForm(updateUser, 'Edit User', user)}
          onDelete={deleteUser}
          onPromote={promoteUser}
          onSuspend={suspendUser}
        />
      }
      showForm={() => showForm(createUser, 'Add User')}
    />
  );
}

export default ManageUsersPage;
