import './RegisterPage.less';

import React from 'react';

import { useHistory } from 'react-router-dom';

import {
  Row,
  Col,
  Form,
  Input,
  Checkbox,
  Button,
  Card,
  notification,
  Typography,
} from 'antd';

const { Title } = Typography;

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
  const [form] = Form.useForm();

  const history = useHistory();

  const openNotification = () => {
    notification.open({
      message: 'Registration Complete',
      description:
        'Confirmation email sent. Please use the link to activate account.',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

  const onFinish = (values) => {
    delete values.confirm;
    fetch('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    openNotification();
  };

  return (
    <Row justify='center'>
      <Col className='bookstore-column'>
        <div className='bookstore-page-section'>
          <Card className='register-container'>
            <Title className='bookstore-register-title'>Register</Title>
            <Form
              {...formItemLayout}
              form={form}
              name='register'
              className='register-form'
              onFinish={onFinish}
              scrollToFirstError>
              <Form.Item
                label='First Name'
                name='firstName'
                rules={[
                  {
                    required: true,
                    message: 'Please input your first name!',
                  },
                ]}>
                <Input />
              </Form.Item>
              <Form.Item
                label='Last Name'
                name='lastName'
                rules={[
                  {
                    required: true,
                    message: 'Please input your last name!',
                  },
                ]}>
                <Input />
              </Form.Item>
              <Form.Item
                name='emailAddress'
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
              <Form.Item name='subscription' {...tailFormItemLayout}>
                <Checkbox defaultChecked={true}>Send me promotions!</Checkbox>
              </Form.Item>
              <Form.Item
                label='Phone number'
                name='phoneNumber'
                rules={[
                  {
                    required: true,
                    message: 'Please input your phone number!',
                  },
                  {
                    pattern: '[0-9]{3}[0-9]{3}[0-9]{4}',
                    max: 10,
                    message: 'The input is not a vaild phone number!',
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
                name='subscription'
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
                  I have read the <Button type='link'>agreement</Button>
                </Checkbox>
              </Form.Item>
              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='register-form-button'
                  size='large'
                  block
                  onSubmit={() => history.push('/auth/register')}>
                  Register
                </Button>
              </Form.Item>
              Already have an account?
              <Button onClick={() => history.push('/login')} type='link'>
                Sign In
              </Button>
            </Form>
          </Card>
        </div>
      </Col>
    </Row>
  );
}

export default Register;
