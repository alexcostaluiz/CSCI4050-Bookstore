import React, { useContext, useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';

import { Button, Dropdown, Menu, Spin } from 'antd';
import {
  UserOutlined,
  LogoutOutlined,
  HistoryOutlined,
} from '@ant-design/icons';

import AuthContext from '../contexts/AuthContext.js';

function DynamicAvatar(props) {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (auth.user !== null) {
      setIsLoaded(true);
    }
  }, [auth]);

  var menu = (
    <Menu mode='inline'>
      <Menu.Item
        icon={<UserOutlined />}
        onClick={() => history.push('/profile')}>
        My Profile
      </Menu.Item>
      {
        auth.user != null && auth.user.roles.includes("ADMIN")?
          <Menu.Item
            icon={<UserOutlined />}
            onClick={() => history.push('/admin')}>
            Admin Dashboard
          </Menu.Item>
          :
          <div></div>
      }
      <Menu.Item
        icon={<HistoryOutlined />}
        onClick={() => history.push('/orderhistory')}>
        Order History
      </Menu.Item>
      <Menu.Item icon={<LogoutOutlined />} onClick={() => auth.signOut()}>
        Logout
      </Menu.Item>
    </Menu>
  );
  
  
  console.log(menu)
  if (!isLoaded) {
    return <Spin />;
  } else {
    if (auth.user.id !== null) {
      return (
        <Dropdown overlay={menu}>
          <Button
            type='primary'
            size='large'
            shape='circle'
            onClick={() => history.push('/profile')}>
            {String(auth.user.firstName).charAt(0) +
              String(auth.user.lastName).charAt(0)}
          </Button>
        </Dropdown>
      );
    } else {
      return (
        <Button type='primary' onClick={() => history.push('/login')}>
          SIGN IN
        </Button>
      );
    }
  }
}
export default DynamicAvatar;
