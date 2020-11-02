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
    console.log('Received values of form: ', values);
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
