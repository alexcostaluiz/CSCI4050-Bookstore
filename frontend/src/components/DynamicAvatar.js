import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import { Button } from 'antd';

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
        if (userData.charAt(0) != '<') {
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

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    if (isSignedIn) {
      return (
        <Button
          type='primary'
          size='large'
          shape='circle'
          onClick={() => history.push('/profile')}>
          {String(items.firstName).charAt(0) + String(items.lastName).charAt(0)}
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
}
export default DynamicAvatar;
