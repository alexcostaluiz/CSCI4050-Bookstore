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
    return user;
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
    console.log(response);
    const data = await response.text();
    console.log(data);
    const u = await fetchUser();
    const redirect = u.roles.includes('ADMIN') ? '/admin' : '/';
    history.push(redirect);
  };

  const signOut = async () => {
    await fetch('/logout');
    await fetchUser();
    history.push('/login');
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
