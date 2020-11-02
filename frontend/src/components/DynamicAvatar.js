import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import { Button, Dropdown, Menu } from 'antd';
import {
  UserOutlined,
  LogoutOutlined,
  HistoryOutlined,
} from '@ant-design/icons';

function DynamicAvatar(props) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const history = useHistory();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const response = fetch('http://localhost:8080/auth/user').then((res) =>
      res.text()
    );
    response.then(
      (userData) => {
        setIsLoaded(true);
        if (userData.charAt(0) !== '<') {
          userData = JSON.parse(userData);
          setItems(userData);
          setIsSignedIn(userData.id != null);
        }
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    );
  }, []);

  const handleLogout = () => {
    fetch('/logout');
    history.push('/');
  };

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
      <Menu.Item icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    if (isSignedIn) {
      return (
        <Dropdown overlay={menu}>
          <Button
            type='primary'
            size='large'
            shape='circle'
            onClick={() => history.push('/profile')}>
            {String(items.firstName).charAt(0) +
              String(items.lastName).charAt(0)}
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
