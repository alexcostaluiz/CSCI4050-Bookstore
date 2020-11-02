import './LoginPage.less';

import React, { useContext } from 'react';

import { useHistory } from 'react-router-dom';

import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  message,
  Row,
  Typography,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import AuthContext from '../contexts/AuthContext.js';

const { Title } = Typography;

const errorMapping = {
  'Bad credentials': 'Invalid username or password',
  'User is disabled': 'You must verify your email before you may sign in',
}

function Login(props) {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [form] = Form.useForm();
  
  const login = async (values) => {
    const response = await auth.signIn(values);
    const url = new URL(response.url);
    if (url.pathname.startsWith('/login')) {
      message.error(errorMapping[url.searchParams.get('error')]);
      form.resetFields();
    } else {
      history.push(url.pathname);
    }
  };

  return (
    <Row justify='center'>
      <Col className='bookstore-column'>
        <div className='bookstore-page-section'>
          <div className='bookstore-login-container'>
            <Title className='bookstore-login-title'>Login</Title>
            <Form
              form={form}
              name='normal_login'
              className='bookstore-login-form'
              initialValues={{
                remember: true,
              }}
              onFinish={(values) => login(values)}>
              <Form.Item
                name='username'
                rules={[
                  {
                    required: true,
                    message: 'Please input a username',
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
                    message: 'Please input a password',
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
                  className='bookstore-login-form-forgot'
                  type='link'
                  onClick={() => history.push('/forgot_password')}>
                  Forgot Password
                </Button>
              </Form.Item>

              <Form.Item style={{ marginBottom: '0px' }}>
                <Button
                  type='primary'
                  htmlType='submit'
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
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default Login;
