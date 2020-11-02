import './ForgotPassword.less';

import React from 'react';

import {
  Row,
  Col,
  Form,
  Input,
  Button,
  notification,
  Typography,
} from 'antd';

const { Paragraph, Title } = Typography;

function ForgotPassword(props) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    fetch('/auth/forgot_password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    notification.open({
      message: 'Email Sent',
      description: 'Click the link in your email to reset your password.',
    });
  };

  return (
    <Row justify='center'>
      <Col className='bookstore-column'>
        <div className='bookstore-page-section'>
          <div className='bookstore-forgot-password-container'>
            <Title className='bookstore-forgot-password-title'>Forgot Password</Title>
            <Paragraph>
              If you have forgotten your password, enter the email address
              you used to register for an account below and a link to reset
              your password will be sent to the address.
            </Paragraph>
            <Form
              form={form}
              name='forgot-password'
              className='bookstore-forgot-password-form'
              onFinish={onFinish}
              scrollToFirstError>
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
              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='bookstore-forgot-password-form-button'
                  size='large'
                  block>
                  Reset Password
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default ForgotPassword;
