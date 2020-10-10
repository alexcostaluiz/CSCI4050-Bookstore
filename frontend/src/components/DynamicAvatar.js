import React from 'react';

import { useHistory } from 'react-router-dom';

import { Button } from 'antd';

function DynamicAvatar(props) {
  const { isSignedIn } = props;

  const history = useHistory();

  if (isSignedIn) {
    return (
      <Button
        type='primary'
        size='large'
        shape='circle'
        onClick={() => history.push('/profile')}>
        AC
      </Button>
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
