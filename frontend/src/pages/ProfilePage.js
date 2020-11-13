import './ProfilePage.less';

import React, { useContext, useState } from 'react';

import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Menu,
  Popconfirm,
  Row,
  Table,
  Typography,
} from 'antd';

import {
  UserOutlined,
  KeyOutlined,
  CreditCardOutlined,
  EnvironmentOutlined,
  ExclamationCircleFilled,
} from '@ant-design/icons';

import Address from '../components/Address.js';
import AddressForm from '../components/AddressForm.js';
import AuthContext from '../contexts/AuthContext.js';
import CardForm from '../components/CardForm.js';
import DB from '../services/DatabaseService.js';

const { Paragraph, Text, Title } = Typography;

function ProfilePage(props) {
  const auth = useContext(AuthContext);

  const [changePasswordForm] = Form.useForm();
  const [cardForm] = Form.useForm();
  const [addressForm] = Form.useForm();

  const [selectedMenuItem, setSelectedMenuItem] = useState('personal info');

  const [firstName, setFirstName] = useState(auth.user.firstName);
  const [lastName, setLastName] = useState(auth.user.lastName);
  const [phoneNumber, setPhoneNumber] = useState(auth.user.phoneNumber);

  const updatePersonalInfo = (value, setter) => {
    if (value) {
      setter(value);
    }
  };

  const menuSwitch = (key) => {
    switch (key) {
      case 'personal info':
        const changesMade =
          firstName === auth.user.firstName &&
          lastName === auth.user.lastName &&
          phoneNumber === auth.user.phoneNumber;
        const editable = {
          autoSize: { minRows: 1, maxRows: 1 },
        };
        return (
          <div className='bookstore-profile-content-container'>
            <Title className='bookstore-profile-content-title'>
              Personal Information
            </Title>
            <Card type='inner' title='Email'>
              <Text>{auth.user.emailAddress}</Text>
            </Card>
            <Card type='inner' title='First Name'>
              <Text
                editable={{
                  ...editable,
                  onChange: (value) => updatePersonalInfo(value, setFirstName),
                }}>
                {firstName}
              </Text>
            </Card>
            <Card type='inner' title='Last Name'>
              <Text
                editable={{
                  ...editable,
                  onChange: (value) => updatePersonalInfo(value, setLastName),
                }}>
                {lastName}
              </Text>
            </Card>
            <Card type='inner' title='Phone Number'>
              <Text
                editable={{
                  ...editable,
                  onChange: (value) =>
                    updatePersonalInfo(value, setPhoneNumber),
                }}>
                {phoneNumber}
              </Text>
            </Card>
            <Button
              type='primary'
              size='large'
              disabled={changesMade}
              onClick={() =>
                DB.updatePersonalInfo(
                  { firstName, lastName, phoneNumber },
                  auth
                )
              }>
              SAVE
            </Button>
          </div>
        );

      case 'change password':
        return (
          <div className='bookstore-profile-content-container'>
            <Title className='bookstore-profile-content-title'>
              Change Password
            </Title>
            <Form
              form={changePasswordForm}
              onFinish={(values) =>
                DB.updatePassword(values, auth, changePasswordForm)
              }>
              <Card type='inner' title='Current Password'>
                <Form.Item
                  name='oldPassword'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your current password',
                    },
                  ]}
                  style={{ marginBottom: '0px' }}>
                  <Input.Password placeholder='Current Password' />
                </Form.Item>
              </Card>
              <Card type='inner' title='New Password'>
                <Form.Item
                  name='newPassword'
                  rules={[
                    {
                      required: true,
                      message: 'Please input a new password',
                    },
                  ]}
                  hasFeedback>
                  <Input.Password placeholder='New Password' />
                </Form.Item>
                <Form.Item
                  name='confirm'
                  dependencies={['newPassword']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your new password',
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (!value || getFieldValue('newPassword') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject('The two passwords do not match');
                      },
                    }),
                  ]}
                  style={{ marginBottom: '0px' }}>
                  <Input.Password placeholder='Confirm Password' />
                </Form.Item>
              </Card>
              <Form.Item style={{ marginBottom: '0px' }}>
                <Button type='primary' htmlType='submit'>
                  CHANGE PASSWORD
                </Button>
              </Form.Item>
            </Form>
          </div>
        );

      case 'payment methods':
        const savedCards = auth.user.savedCards.map((c) => ({
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
          <div className='bookstore-profile-content-container'>
            <Title className='bookstore-profile-content-title'>
              Payment Methods
            </Title>
            <Table
              dataSource={savedCards}
              columns={cardColumns}
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
                    <Popconfirm
                      title='Are your sure?'
                      onConfirm={() => DB.deleteCard(record, auth)}
                      okText='Yes'
                      cancelText='Cancel'>
                      <Button
                        type='primary'
                        style={{ float: 'right', marginTop: '32px' }}>
                        DELETE
                      </Button>
                    </Popconfirm>
                  </div>
                ),
              }}
              bordered
            />
            <Card type='inner' title='Add New Debit/Credit Card'>
              <CardForm
                form={cardForm}
                addCard={(values) => DB.createCard(values, auth)}
              />
            </Card>
            <Button
              type='primary'
              size='large'
              form='credit-card-form'
              htmlType='submit'>
              ADD CARD
            </Button>
          </div>
        );

      default:
        const addresses = auth.user.addresses.map((a) => ({
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
          <div className='bookstore-profile-content-container'>
            <Title className='bookstore-profile-content-title'>
              Saved Addresses
            </Title>
            <Table
              dataSource={addresses}
              columns={addressColumns}
              expandable={{
                expandRowByClick: true,
                expandedRowRender: (record) => (
                  <div>
                    <Address {...record} />
                    <Popconfirm
                      title='Are your sure?'
                      onConfirm={() => DB.deleteAddress(record, auth)}
                      okText='Yes'
                      cancelText='Cancel'>
                      <Button
                        type='primary'
                        style={{ float: 'right', marginTop: '16px' }}>
                        DELETE
                      </Button>
                    </Popconfirm>
                  </div>
                ),
              }}
              bordered
            />
            <Card type='inner' title='Add New Address'>
              <AddressForm
                form={addressForm}
                addAddress={(values) => DB.createAddress(values, auth)}
              />
            </Card>
            <Button
              type='primary'
              size='large'
              form='address-form'
              htmlType='submit'>
              ADD ADDRESS
            </Button>
          </div>
        );
    }
  };

  return (
    <Row>
      <Col span={24} className='bookstore-column'>
        <div className='bookstore-page-section' style={{ alignItems: 'start' }}>
          <div className='bookstore-profile-menu-container'>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                margin: '12px 8px',
              }}>
              <Button type='primary' size='large' shape='circle'>
                {String(auth.user.firstName).charAt(0) +
                  String(auth.user.lastName).charAt(0)}
              </Button>
              <div style={{ marginLeft: '8px', lineHeight: 1 }}>
                <Text style={{ fontWeight: '900' }}>
                  {auth.user.firstName + ' ' + auth.user.lastName}
                </Text>
                <br />
                <Text style={{ fontSize: '11px' }}>Personal Settings</Text>
              </div>
            </div>
            <Menu
              mode='vertical'
              defaultSelectedKeys={['personal info']}
              className='bookstore-profile-menu'
              onClick={(e) => setSelectedMenuItem(e.key)}>
              <Menu.Item key='personal info' icon={<UserOutlined />}>
                Personal Information
              </Menu.Item>
              <Menu.Item key='addresses' icon={<EnvironmentOutlined />}>
                Addresses
              </Menu.Item>
              <Menu.Item key='payment methods' icon={<CreditCardOutlined />}>
                Payment Methods
              </Menu.Item>
              <Menu.Item key='change password' icon={<KeyOutlined />}>
                Change Password
              </Menu.Item>
            </Menu>
          </div>
          {menuSwitch(selectedMenuItem)}
        </div>
      </Col>
    </Row>
  );
}
export default ProfilePage;
