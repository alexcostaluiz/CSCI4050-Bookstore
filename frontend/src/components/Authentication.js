import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';

import AuthContext from '../contexts/AuthContext.js';

const errorMapping = {
  'Bad credentials': 'Invalid username or password',
  'User is disabled': 'Please verify your email before signing in',
};

function Authentication(props) {
  const [user, setUser] = useState(null);

  const history = useHistory();

  const fetchUser = async () => {
    const response = await fetch('/auth/user');
    const user = await response.json();
    setUser(user);
  };

  useEffect(() => {
    fetchUser();
  }, []);

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
      {props.children}
    </AuthContext.Provider>
  );
}

export default Authentication;
