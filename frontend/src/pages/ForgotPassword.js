import './ForgotPassword.less';

import React, { useState } from 'react';

import { Row, Col, Form, Input, Button, Typography } from 'antd';

const { Paragraph, Title } = Typography;

function ForgotPassword(props) {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(null);

  const onFinish = async (values) => {
    setLoading(true);
    await fetch('/auth/forgotPassword', {
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
    <div className='bookstore-forgot-password-container'>
      <Title className='bookstore-forgot-password-title'>Forgot Password</Title>
      <Paragraph>
        A password reset link has been successfully emailed to{' '}
        <b>{submitted.emailAddress}</b>. Please follow the link to reset your
        password. If you cannot find the email you may try resending the reset
        link.
      </Paragraph>
      <Button
        type='primary'
        onClick={() => onFinish(submitted)}
        loading={loading}
        size='large'>
        RESEND EMAIL
      </Button>
    </div>
  ) : (
    <div className='bookstore-forgot-password-container'>
      <Title className='bookstore-forgot-password-title'>Forgot Password</Title>
      <Paragraph>
        If you have forgotten your password, enter the email address you used to
        register for an account below and a link to reset your password will be
        sent to the address.
      </Paragraph>
      <Form
        form={form}
        name='forgot-password'
        className='bookstore-forgot-password-form'
        onFinish={onFinish}>
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
          <Input placeholder='Email Address' />
        </Form.Item>
        <Form.Item style={{ marginBottom: '0px' }}>
          <Button
            type='primary'
            htmlType='submit'
            size='large'
            loading={loading}>
            RESET PASSWORD
          </Button>
        </Form.Item>
      </Form>
    </div>
  );

  return (
    <Row justify='center'>
      <Col className='bookstore-column'>
        <div className='bookstore-page-section'>{content}</div>
      </Col>
    </Row>
  );
}

export default ForgotPassword;
