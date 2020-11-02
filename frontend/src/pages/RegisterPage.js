import './RegisterPage.less';

import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';

import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Typography,
} from 'antd';

const { Paragraph, Title } = Typography;

function Register(props) {
  const history = useHistory();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(null);

  const onFinish = async (values) => {
    setLoading(true);
    
    delete values.confirm;
    await fetch('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    
    setLoading(false);
    setSubmitted(values);
  };

  const content = submitted ? (
    <div className='bookstore-register-container'>
      <Title className='bookstore-register-title' style={{ marginBottom: '8px' }}>
        Welcome, {submitted.firstName}!
      </Title>
      <Paragraph>
        Your account has been successfully created! A confirmation email has been sent
        to <b>{submitted.emailAddress}</b> with a link to confirm your email address.
        Once you have confirmed your email address, you may sign in.
      </Paragraph>
      <Button
        type='primary'
        size='large'
        onClick={() => history.push('/login')}>
        SIGN IN
      </Button>
    </div>
  ) : (
    <div className='bookstore-register-container'>
      <Title className='bookstore-register-title'>Register</Title>
      <Form
        form={form}
        name='register'
        className='bookstore-register-form'
        onFinish={onFinish}>
        <Form.Item
          name='firstName'
          rules={[
            {
              required: true,
              message: 'Please input your first name',
            },
          ]}>
          <Input placeholder='First Name' />
        </Form.Item>
        <Form.Item
          name='lastName'
          rules={[
            {
              required: true,
              message: 'Please input your last name',
            },
          ]}>
          <Input placeholder='Last Name'/>
        </Form.Item>
        <Form.Item
          name='emailAddress'
          rules={[
            {
              type: 'email',
              message: 'The input provided is not a valid email address',
            },
            {
              required: true,
              message: 'Please input an email address',
            },
          ]}>
          <Input placeholder='Email Address'/>
        </Form.Item>
        <Form.Item
          name='phoneNumber'
          rules={[
            {
              required: true,
              message: 'Please input a phone number',
            },
            {
              pattern: '[0-9]{3}[0-9]{3}[0-9]{4}',
              max: 10,
              message: 'The input provided is not a valid phone number',
            },
          ]}>
          <Input placeholder='Phone Number'/>
        </Form.Item>
        <Form.Item
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input a password',
            },
          ]}
          hasFeedback>
          <Input.Password placeholder='Password' />
        </Form.Item>
        <Form.Item
          name='confirm'
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
                return Promise.reject(
                  'The two passwords do not match'
                );
              },
            }),
          ]}>
          <Input.Password placeholder='Confirm Password' />
        </Form.Item>
        <Form.Item name='subscription'>
          <Checkbox defaultChecked={true}>Sign up for promotional emails</Checkbox>
        </Form.Item>
        <Paragraph>
          By clicking "Register" below, you agree to the Bookstore{' '}
          <Button type='link' style={{ padding: '0px', height: 'unset' }}>
            Terms of Service
          </Button>
          {' '}and{' '}
          <Button type='link' style={{ padding: '0px', height: 'unset' }}>
            Privacy Policy
          </Button>.
        </Paragraph>
        <Form.Item style={{ marginBottom: '0px' }}>
          <Button
            type='primary'
            htmlType='submit'
            className='bookstore-register-form-button'
            size='large'
            loading={loading}
            block
            onSubmit={() => history.push('/login')}>
            REGISTER
          </Button>
        </Form.Item>
        Already have an account?{' '}
        <Button onClick={() => history.push('/login')} type='link' style={{ padding: '0px'}}>
          Sign In
        </Button>
      </Form>
    </div>
  );

  return (
    <Row justify='center'>
      <Col className='bookstore-column'>
        <div className='bookstore-page-section'>
          {content}
        </div>
      </Col>
    </Row>
  );
}

export default Register;
