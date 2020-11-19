import './BookForm.less';

import React, { useState } from 'react';

import { Button, Form, Input, Modal, Select, Typography } from 'antd';

const { Title } = Typography;

function UserForm(props) {
  const { initialValues, onSubmit = () => {}, title } = props;

  const [form] = Form.useForm();
  
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    const ok = await onSubmit(values);
    if (ok) {
      Modal.destroyAll();
    }
    setLoading(false);
  };

  return (
    <Form
      form={form}
      id='user-form'
      layout='vertical'
      initialValues={initialValues}
      onFinish={onFinish}
      requiredMark={false}>
      <Title style={{ fontWeight: '900' }}>{title}</Title>
      
      <Form.Item name='id' hidden>
        <Input />
      </Form.Item>

      <Form.Item
        label='Email Address'
        name='emailAddress'
        hasFeedback
        style={{ width: '50%' }}
        rules={[
          {type: 'email', message: 'Please enter a valid email address'},
          {required: true, message: 'Please enter an email address'},
        ]}>
        <Input />
      </Form.Item>

      <div className='bookstore-book-form-field-container'>
        <Form.Item
          label='First Name'
          name='firstName'
          hasFeedback
          rules={[{ required: true, message: 'Please enter a first name' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label='Last Name'
          name='lastName'
          hasFeedback
          rules={[{ required: true, message: 'Please enter a last name' }]}>
          <Input />
        </Form.Item>
      </div>

      <Form.Item
        label='Phone Number'
        name='phoneNumber'
        style={{ width: '50%' }}>
        <Input />
      </Form.Item>

      <div className='bookstore-book-form-field-container'>
        <Form.Item
          label="Password"
          name="password"
          hasFeedback
          rules={[{ required: true, message: 'Please enter a password' }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirm"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('The two passwords do not match');
              },
            }),
          ]}>
          <Input.Password />
        </Form.Item>
      </div>

      <div className='bookstore-book-form-field-container'>
        <Form.Item
          label='Status'
          name='status'
          hasFeedback
          rules={[{ required: true, message: 'Please choose a status' }]}>
          <Select allowClear>
            <Select.Option value='Active'>Active</Select.Option>
            <Select.Option value='Inactive'>Inactive</Select.Option>
            <Select.Option value='Suspended'>Suspended</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label='Roles'
          name='roles'
          hasFeedback
          rules={[{ required: true, message: 'Please select roles' }]}>
          <Select mode='multiple' allowClear>
            <Select.Option value='USER'>USER</Select.Option>
            <Select.Option value='EMPLOYEE'>EMPLOYEE</Select.Option>
            <Select.Option value='ADMIN'>ADMIN</Select.Option>
          </Select>
        </Form.Item>
      </div>
      
      <Form.Item style={{ margin: '16px 0px 0px 0px' }}>
        <Button
          className='bookstore-book-form-action'
          type='primary'
          loading={loading}
          htmlType='submit'>
          SAVE
        </Button>
        <Button
          className='bookstore-book-form-action'
          onClick={() => Modal.destroyAll()}>
          CANCEL
        </Button>
      </Form.Item>      
    </Form>
  );
}

export default UserForm;
