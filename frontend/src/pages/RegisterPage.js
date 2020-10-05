import './Register.less';

import React from 'react';
import { useHistory } from 'react-router-dom';

import {
  Form,
  Input,
  Select,
  Checkbox,
  Button,
  Card,
  message,
  notification,
  Result,
} from 'antd';

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function Register(props) {
  const history = useHistory();
  const [form] = Form.useForm();
  const openNotification = () => {
    notification.open({
      message: 'Registration Complete',
      description: 'You are in! Welcome to the Bookstore!',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    openNotification();
  };

  return (
    <Card
      title='Register'
      className='register-container'
      style={{ width: 900 }}>
      <Form
        {...formItemLayout}
        form={form}
        name='register'
        className='register-form'
        onFinish={onFinish}
        scrollToFirstError>
        <Form.Item
          label='Username'
          name='username'
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          name='email'
          label='E-mail'
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          name='password'
          label='Password'
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback>
          <Input.Password />
        </Form.Item>
        <Form.Item
          name='confirm'
          label='Confirm Password'
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  'The two passwords that you entered do not match!'
                );
              },
            }),
          ]}>
          <Input.Password />
        </Form.Item>
        <Form.Item
          name='agreement'
          valuePropName='checked'
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject('Should accept agreement'),
            },
          ]}
          {...tailFormItemLayout}>
          <Checkbox>
            I have read the <a href=''>agreement</a>
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='register-form-button'>
            Register
          </Button>
        </Form.Item>
        Already have an account? <a href='/login'>Sign In!</a>
      </Form>
    </Card>
  );
}

export default Register;
