import './ProfilePage.less';
import 'react-credit-cards/es/styles-compiled.css';

import React, { useContext, useState } from 'react';

import {
  Col,
  Menu,
  Typography,
  Input,
  Card,
  Space,
  DatePicker,
  Button,
  message,
  Form,
  Row,
  Table,
  notification,
  Popconfirm,
} from 'antd';

import {
  UserOutlined,
  KeyOutlined,
  CreditCardOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';

import Cards from 'react-credit-cards';

import AuthContext from '../contexts/AuthContext.js';
import CountrySelect from '../components/CountrySelect.js';

const { Paragraph, Text, Title } = Typography;

function PaymentForm(props) {
  const { addCard } = props;

  const [expiry, setExpiry] = useState('');
  const [focus, setFocus] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleFocusChange = (e) => {
    setFocus(e.target.name);
  };

  return (
    <div className='bookstore-credit-card-form'>
      <Cards
        expiry={expiry}
        focused={focus}
        name={name}
        number={number}
        preview
      />
      <Form
        id='credit-card-form'
        onFinish={(values) => addCard(values)}
        style={{ marginLeft: '32px', width: '100%' }}>
        <Form.Item>
          <Input
            id='card-number'
            type='tel'
            name='number'
            placeholder='Card Number'
            onChange={(e) => setNumber(e.target.value)}
            onFocus={handleFocusChange}
          />
        </Form.Item>
        <Form.Item>
          <Input
            id='card-name'
            name='name'
            placeholder='Name'
            onChange={(e) => setName(e.target.value)}
            onFocus={handleFocusChange}
          />
        </Form.Item>
        <Form.Item style={{ marginBottom: '0px' }}>
          <DatePicker
            id='exp-date'
            picker='month'
            name='expiry'
            placeholder='Valid Thru'
            onChange={(_, date) => setExpiry(date)}
            onFocus={handleFocusChange}
          />
        </Form.Item>
      </Form>
    </div>
  );
}

function Profile(props) {
  const auth = useContext(AuthContext);
  const [changePasswordForm] = Form.useForm();
  const [form] = Form.useForm();

  auth.user = {
    address: null,
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
    const response = await fetch('/auth/edit_profile', {
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
    const response = await fetch('/auth/changePassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    if (response.ok) {
      changePasswordForm.resetFields();
      message.success('Password successfully updated!');
    }
  };

  const addCard = async (values) => {
    const card = { ...values, cardType: 'VISA', user: 1 };
    const response = await fetch('/auth/saveCard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(card),
    });
    if (response.ok) {
      auth.fetchUser();
      message.success('Card sucessfully saved!');
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
                  hasFeedback>
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
                  ]}>
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
        const columns = [
          {
            title: 'Your Credit and Debit Cards',
            dataIndex: 'name',
            key: 'name',
          },
          { title: 'Expires', dataIndex: 'date', key: 'date' },
        ];
        return (
          <div className='bookstore-profile-content-container'>
            <Title className='bookstore-profile-content-title'>
              Payment Methods
            </Title>
            <Table
              rowClassName={() => 'editable-row'}
              bordered
              dataSource={auth.user.savedCards}
              columns={columns}
            />
            <Card type='inner' title='Add New Debit/Credit Card'>
              <PaymentForm addCard={addCard} />
            </Card>
            <Form.Input
              htmlFor='credit-card-form'
              style={{ marginBottom: '0px' }}>
              <Button type='primary' htmlType='submit'>
                ADD CARD
              </Button>
            </Form.Input>
          </div>
        );

      default:
        return (
          <div className='bookstore-profile-content-container'>
            <Title className='bookstore-profile-content-title'>
              Saved Addresses
            </Title>
            <Form form={form} layout='vertical' id='address-form'>
              <Form.Item label='Street Address'>
                <Input id='street' placeholder='Street' readOnly />
              </Form.Item>
              <Form.Item label='Street Address Line 2'>
                <Input placeholder='input placeholder' />
              </Form.Item>
              <Form.Item>
                <Space direction='horizontal'>
                  <Form.Item label='City'>
                    <Input
                      id='city'
                      defaultValue='Athens'
                      placeholder='input placeholder'
                      readOnly
                    />
                  </Form.Item>
                  <Form.Item label='State/Province'>
                    <Input
                      id='state'
                      defaultValue='GA'
                      placeholder='input placeholder'
                      readOnly
                    />
                  </Form.Item>
                </Space>
              </Form.Item>
              <Form.Item>
                <Space direction='horizontal'>
                  <Form.Item label='Postal/ZipCode'>
                    <Input
                      id='zip'
                      defaultValue='30606'
                      placeholder='input placeholder'
                      readOnly
                    />
                  </Form.Item>
                  <Form.Item label='Country'>
                    <CountrySelect />
                  </Form.Item>
                </Space>
              </Form.Item>
              <Form.Item>
                <Button type='primary'>Update Address</Button>
              </Form.Item>
            </Form>
          </div>
        );
    }
  };

  return (
    <Row>
      <Col span={24} className='bookstore-column'>
        <div className='bookstore-page-section'>
          <div className='bookstore-profile-menu-container'>
            <Menu
              mode='vertical'
              defaultSelectedKeys={['personal info']}
              className='bookstore-profile-menu'
              onClick={(e) => setSelectedMenuItem(e.key)}>
              <Menu.Item key='personal info' icon={<UserOutlined />}>
                Personal Information
              </Menu.Item>
              <Menu.Item key='payment methods' icon={<CreditCardOutlined />}>
                Payment Methods
              </Menu.Item>
              <Menu.Item key='addresses' icon={<EnvironmentOutlined />}>
                Addresses
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
export default Profile;
