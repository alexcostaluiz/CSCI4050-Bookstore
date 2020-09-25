import React from 'react';

import { Button } from 'antd';

function DynamicAvatar(props) {
  const { isSignedIn } = props;

  if (isSignedIn) {
    return (
      <Button type='primary' size='large' shape='circle'>
        AC
      </Button>
    );
  } else {
    return (
      <Button type='primary' size='large'>
        Sign In
      </Button>
    );
  }
}

export default DynamicAvatar;
