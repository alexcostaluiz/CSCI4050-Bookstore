import './LoginPage.less';

import React, { useContext } from 'react';

import { useHistory } from 'react-router-dom';

import {
  Button,
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

function Login(props) {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [form] = Form.useForm();

  const login = async (values) => {
    const response = await auth.signIn(values);
    if (response) {
      message.error(response);
      form.resetFields();
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
                  placeholder='Email Address'
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
                <Input.Password
                  prefix={<LockOutlined className='site-form-item-icon' />}
                  placeholder='Password'
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name='remember' valuePropName='checked' noStyle>
                  <Checkbox style={{ paddingTop: '2px' }}>Remember Me</Checkbox>
                </Form.Item>

                <Button
                  className='bookstore-login-form-forgot'
                  type='link'
                  onClick={() => history.push('/forgotPassword')}>
                  Forgot Password
                </Button>
              </Form.Item>

              <Form.Item style={{ marginBottom: '0px' }}>
                <Button type='primary' htmlType='submit' size='large' block>
                  LOG IN
                </Button>
                Don't have an account yet?{' '}
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
