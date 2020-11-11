import './ProfilePage.less';

import React, { useContext, useState } from 'react';

import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Menu,
  message,
  Row,
  Table,
  Typography,
} from 'antd';

import {
  UserOutlined,
  KeyOutlined,
  CreditCardOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';

import Address from '../components/Address.js';
import AddressForm from '../components/AddressForm.js';
import AuthContext from '../contexts/AuthContext.js';
import CardForm from '../components/CardForm.js';

const { Paragraph, Text, Title } = Typography;

function ProfilePage(props) {
  const auth = useContext(AuthContext);

  const [changePasswordForm] = Form.useForm();
  const [cardForm] = Form.useForm();
  const [addressForm] = Form.useForm();
  /*
  auth.user = {
    addresses: [
      {
        id: 1,
        name: 'Alexander Costa',
        address1: '490 Barnett Shoals Rd',
        address2: 'Apt 311',
        city: 'Athens',
        state: 'Georgia',
        zip: 30605,
        country: 'United States',
        phoneNumber: '4049849898',
      },
    ],
    cart: null,
    emailAddress: 'alexcostaluiz@outlook.com',
    firstName: 'Alexander',
    lastName: 'Costa',
    orders: [],
    phoneNumber: '4049849898',
    roles: ['USER'],
    savedCards: [],
    status: 'Active',
    subscription: true,
  };
  */
  console.log(auth);

  const [selectedMenuItem, setSelectedMenuItem] = useState('personal info');

  const [firstName, setFirstName] = useState(auth.user.firstName);
  const [lastName, setLastName] = useState(auth.user.lastName);
  const [phoneNumber, setPhoneNumber] = useState(auth.user.phoneNumber);

  const updatePersonalInfo = (value, setter) => {
    if (value) {
      setter(value);
    }
  };

  const savePersonalInfo = async () => {
    const response = await fetch('/edit/personalInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName, phoneNumber }),
    });
    if (response.ok) {
      auth.fetchUser();
      message.success('Profile information successfully updated!');
    }
  };

  const changePassword = async (values) => {
    delete values.confirm;
    const response = await fetch('/edit/password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    if (response.ok) {
      auth.fetchUser();
      changePasswordForm.resetFields();
      message.success('Password successfully updated!');
    } else {
      changePasswordForm.resetFields();
      message.error('Failed to update password. Invalid credentials.');
    }
  };

  const addCard = async (values) => {
    delete values.valid;
    const response = await fetch('/edit/saveCard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    if (response.ok) {
      auth.fetchUser();
      message.success('Card sucessfully saved!');
    }
  };

  const deleteCard = async (card) => {
    delete card.description;
    const response = await fetch('/edit/deleteCard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(card),
    });
    if (response.ok) {
      auth.fetchUser();
      message.success('Card successfully deleted!');
    }
  };

  const addAddress = async (values) => {
    const response = await fetch('/edit/saveAddress', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    if (response.ok) {
      auth.fetchUser();
      message.success('Address sucessfully saved!');
    }
  };

  const deleteAddress = async (values) => {
    const response = await fetch('/edit/deleteAddress', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    if (response.ok) {
      auth.fetchUser();
      message.success('Address sucessfully deleted!');
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
              onClick={savePersonalInfo}>
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
              onFinish={(values) => changePassword(values)}>
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
                expandedRowRender: (record) => (
                  <div>
                    <div className='bookstore-credit-card-table-expanded-container'>
                      <div>
                        <Title level={5}>Name on Card</Title>
                        <Paragraph>{record.name}</Paragraph>
                      </div>
                      <div>
                        <Title level={5}>Billing Address</Title>
                        <Paragraph>[insert billing address]</Paragraph>
                      </div>
                    </div>
                    <Button
                      type='primary'
                      onClick={() => deleteCard(record)}
                      style={{ float: 'right', marginTop: '32px' }}>
                      DELETE
                    </Button>
                  </div>
                ),
              }}
              bordered
            />
            <Card type='inner' title='Add New Debit/Credit Card'>
              <CardForm form={cardForm} addCard={addCard} />
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
                expandedRowRender: (record) => (
                  <div>
                    <Address {...record} />
                    <Button
                      type='primary'
                      onClick={() => deleteAddress(record)}
                      style={{ float: 'right', marginTop: '16px' }}>
                      DELETE
                    </Button>
                  </div>
                ),
              }}
              bordered
            />
            <Card type='inner' title='Add New Address'>
              <AddressForm form={addressForm} addAddress={addAddress} />
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
