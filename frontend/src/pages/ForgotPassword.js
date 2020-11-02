import './ForgotPassword.less';

import React from 'react';

import { useHistory } from 'react-router-dom';

import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Card,
  notification,
  Typography,
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

function ForgotPassword(props) {
  const [form] = Form.useForm();

  const history = useHistory();

  const openNotification = () => {
    notification.open({
      message: 'Email Sent',
      description: 'Click the link in your email to reset your password!',
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
          <Card className='forgot-password-container'>
            <Title className='forgot-password-title'>Forgot Password?</Title>
            <Text className='forgot-password-text'>
              If you have forgotten your password, simply enter your email
              address and we will send you a link to reset your password.
            </Text>
            <Form
              {...formItemLayout}
              form={form}
              name='forgot-password'
              className='forgot-password'
              onFinish={onFinish}
              scrollToFirstError>
              <Form.Item
                label='E-mail address'
                name='email'
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your email address!',
                  },
                ]}>
                <Input />
              </Form.Item>
              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='forgot-password-button'
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

export default ForgotPassword;
