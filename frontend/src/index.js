import './css/normalize.css';
import './css/skeleton.css';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';

import Footer from './components/Footer.js';
import Header from './components/Header.js';
import HomePage from './pages/HomePage.js';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <HomePage />
    <Footer />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
