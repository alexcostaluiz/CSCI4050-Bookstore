import './LoginPage.less';

import React from 'react';
import { Form, Input, Button, Checkbox, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

var isLoggedIn = Boolean;

function Login(props) {
  const history = useHistory();

  const onFinish = (values) => {
    isLoggedIn = true;
  };
  const onSubmit = (values) => {
    if (isLoggedIn === true) {
      history.push('/');
    } else {
      isLoggedIn = false;
    }
  };

  return (
    <Card className='login-container'>
      <Form
        name='normal_login'
        className='login-form'
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}>
        <Form.Item
          name='username'
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}>
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='Username'
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}>
          <Input
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Password'
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name='remember' valuePropName='checked' noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className='login-form-forgot'>Forgot password</a>
        </Form.Item>

        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
            onClick={onSubmit}>
            Log in
          </Button>
          Or <a href='/register'>register now!</a>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default Login;
