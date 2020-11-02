import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';

import AuthContext from '../contexts/AuthContext.js';

function Authentication(props) {
  const [user, setUser] = useState(null);

  const history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('/auth/user');
        const user = await response.json();
        setUser(user);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const signIn = async (values) => {
    const query = new URLSearchParams(values).toString();
    console.log(query);
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: query,
    });
    console.log(response);
  };

  const signOut = () => {
    fetch('/logout');
    history.push('/');
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
