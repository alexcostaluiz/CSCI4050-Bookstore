import './LoginPage.less';

import React from 'react';

import { useHistory } from 'react-router-dom';

import {
  Col,
  Row,
  Form,
  Input,
  Button,
  Checkbox,
  Card,
  Typography,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Title } = Typography;

var isLoggedIn = Boolean;

function Login(props) {
  const history = useHistory();

  const onFinish = (values) => {
    var querystring = require('querystring');
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: querystring.stringify(values),
    }).then((res) => window.location.replace(res.url));
  };
  const onSubmit = (values) => {
    if (isLoggedIn === true) {
      history.push('/');
    } else {
      //isLoggedIn = false;
    }
  };

  return (
    <Row justify='center'>
      <Col className='bookstore-column'>
        <div className='bookstore-page-section'>
          <Card className='login-container'>
            <Title className='bookstore-login-title'>Login</Title>
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
                  <Checkbox>Remember Me</Checkbox>
                </Form.Item>

                <Button
                  className='login-form-forgot'
                  type='link'
                  onClick={() => history.push('/forgot_password')}>
                  Forgot Password
                </Button>
              </Form.Item>

              <Form.Item style={{ marginBottom: '0px' }}>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='login-form-button'
                  onClick={onSubmit}
                  size='large'
                  block>
                  LOG IN
                </Button>
                <Button
                  type='link'
                  onClick={() => history.push('/register')}
                  style={{ paddingLeft: '0px' }}>
                  Register
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </Col>
    </Row>
  );
}

export default Login;
