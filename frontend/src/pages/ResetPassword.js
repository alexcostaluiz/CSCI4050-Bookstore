import './ResetPassword.less';

import React from 'react';
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Card,
  Typography,
  notification,
} from 'antd';

import { useLocation } from 'react-router-dom';

const { Title, Text } = Typography;

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

function ResetPassword(props) {
  const location = useLocation();
  const [form] = Form.useForm();
  const openNotification = () => {
    notification.open({
      message: 'Password Reset',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

  const onFinish = (values) => {
    delete values.confirm
    values['token'] = location.search.split('=')[1];
    fetch('/registration/savePassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    });
    openNotification();
  };

  return (
    <Row justify='center'>
      <Col className='bookstore-column'>
        <div className='bookstore-page-section'>
          <Card className='reset-password-container'>
            <Title className='reset-password-title'>Reset Password</Title>
            <Text>
              Please enter and confirm your new password below to access your
              account.
            </Text>
            <Form
              {...formItemLayout}
              form={form}
              name='reset-password'
              className='reset-password'
              onFinish={onFinish}
              scrollToFirstError>
              <Form.Item
                name='newPassword'
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
                dependencies={['newPassword']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue('newPassword') === value) {
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
              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='reset-password-button'
                  size='large'
                  block>
                  Reset Password
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </Col>
    </Row>
  );
}

export default ResetPassword;
