import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';

import AuthContext from '../contexts/AuthContext.js';

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
    await fetchUser();
    return response;
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
  };

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default Authentication;
