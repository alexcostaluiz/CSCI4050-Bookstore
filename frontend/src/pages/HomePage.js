import './HomePage.css';

import React, { useEffect, useState } from 'react';

function HomePage(props) {
  const [ dbData, setDbData ] = useState('');

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/example');
      const data = await response.text();
      setDbData(data);
    })();
  }, []);
  
  return (
    <div className='container u-full-width'>
      <div className='row'>
        <div className='column welcome'>
          <h2>Welcome to the Online Bookstore!</h2>
          <p>Some data from the database:</p>
          <p>{dbData ? dbData : 'loading...'}</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
