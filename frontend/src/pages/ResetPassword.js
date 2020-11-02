import './ResetPassword.less';

import React, { useState } from 'react';

import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Typography,
} from 'antd';

import { useHistory, useLocation } from 'react-router-dom';

const { Paragraph, Title } = Typography;

function ResetPassword(props) {
  const history = useHistory();
  const location = useLocation();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const onFinish = async (values) => {
    setLoading(true);
    
    delete values.confirm;
    values['token'] = location.search.split('=')[1];
    await fetch('/registration/savePassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    setLoading(false);
    setSubmitted(true);
  };

  const content = submitted ? (
    <div className='bookstore-reset-password-container'>
      <Title className='bookstore-reset-password-title'>Reset Password</Title>
      <Paragraph>
        Your password has been successfully reset! You may now sign in using your
        new password.
      </Paragraph>
      <Button
        type='primary'
        htmlType='submit'
        size='large'
        onClick={() => history.push('/login')}>
        SIGN IN
      </Button>
    </div>
  ) : (
    <div className='bookstore-reset-password-container'>
      <Title className='bookstore-reset-password-title'>Reset Password</Title>
      <Paragraph>
        Please enter and confirm your new password below.
      </Paragraph>
      <Form
        form={form}
        name='reset-password'
        className='bookstore-reset-password-form'
        onFinish={onFinish}>
        <Form.Item
          name='newPassword'
          rules={[
            {
              required: true,
              message: 'Please input a new password',
            },
          ]}
          hasFeedback>
          <Input.Password placeholder='Password'/>
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
                return Promise.reject(
                  'The two passwords do not match'
                );
              },
            }),
          ]}>
          <Input.Password placeholder='Confirm Password'/>
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
        <div className='bookstore-page-section'>
          {content}
        </div>
      </Col>
    </Row>
  );
}

export default ResetPassword;
