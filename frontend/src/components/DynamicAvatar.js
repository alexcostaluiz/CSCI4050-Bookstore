import React, { useContext, useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';

import { Button, Dropdown, Menu } from 'antd';
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

  const menu = (
    <Menu mode='inline'>
      <Menu.Item
        icon={<UserOutlined />}
        onClick={() => history.push('/profile')}>
        My Profile
      </Menu.Item>
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

  if (!isLoaded) {
    return <div>Loading...</div>;
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
        <Button
          type='primary'
          size='large'
          onClick={() => history.push('/login')}>
          SIGN IN
        </Button>
      );
    }
  }
}
export default DynamicAvatar;
