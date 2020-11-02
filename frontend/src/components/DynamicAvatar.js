import React from 'react';

import { useHistory } from 'react-router-dom';

import { Button, Dropdown, Menu } from 'antd';
import {
  UserOutlined,
  LogoutOutlined,
  HistoryOutlined,
} from '@ant-design/icons';

function DynamicAvatar(props) {
  const { isSignedIn } = props;

  const history = useHistory();

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
      <Menu.Item icon={<LogoutOutlined />}>Logout</Menu.Item>
    </Menu>
  );

  if (isSignedIn) {
    return (
      <Dropdown overlay={menu}>
        <Button type='primary' size='large' shape='circle'>
          AC
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

export default DynamicAvatar;
