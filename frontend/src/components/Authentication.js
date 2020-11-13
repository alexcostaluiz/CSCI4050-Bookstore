import React, { useEffect, useState } from 'react';

import { useHistory, useLocation } from 'react-router-dom';

import { Spin, Typography } from 'antd';

import AuthContext from '../contexts/AuthContext.js';

const { Title } = Typography;

const errorMapping = {
  'Bad credentials': 'Invalid username or password',
  'User is disabled': 'Please verify your email before signing in',
};

const protectedEndpoints = ['/profile', '/admin', '/orderHistory'];

function Authentication(props) {
  const [user, setUser] = useState(null);

  const history = useHistory();
  const location = useLocation();

  const isProtected = (pathname) => {
    for (const path of protectedEndpoints) {
      if (pathname.startsWith(path)) {
        return true;
      }
    }
    return false;
  };

  const fetchUser = async () => {
    const response = await fetch('/auth/user');
    const user = await response.json();
    setUser(user);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user && isProtected(location.pathname) && user.id === null) {
      history.replace('/login');
    }
  }, [location.pathname, user, history]);

  const signIn = async (values) => {
    const query = new URLSearchParams(values).toString();
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: query,
    });
    const url = new URL(response.url);
    if (url.pathname.startsWith('/login')) {
      return errorMapping[url.searchParams.get('error')];
    } else {
      await fetchUser();
      history.push(url.pathname);
      return undefined;
    }
  };

  const signOut = async () => {
    const response = await fetch('/logout');
    await fetchUser();
    const redirect = new URL(response.url);
    history.push(redirect.pathname);
  };

  const context = {
    signIn,
    signOut,
    user,
    fetchUser,
  };

  return (
    <AuthContext.Provider value={context}>
      {user === null && isProtected(location.pathname) ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            flexDirection: 'column',
          }}>
          <Spin size='large' />
          <Title level={4} style={{ fontWeight: '900', marginTop: '16px' }}>
            Getting things ready...
          </Title>
        </div>
      ) : (
        props.children
      )}
    </AuthContext.Provider>
  );
}

export default Authentication;
