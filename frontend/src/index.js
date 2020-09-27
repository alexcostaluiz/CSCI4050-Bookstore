import React from 'react';
import ReactDOM from 'react-dom';

import { Layout } from 'antd';

import Footer from './components/Footer.js';
import Header from './components/Header.js';
import HomePage from './pages/HomePage.js';

import * as serviceWorker from './serviceWorker';

const { Content } = Layout;

ReactDOM.render(
  <React.StrictMode>
    <Layout>
      <Header />
      <Content style={{ background: 'white' }}>
        <HomePage />
      </Content>
      <Footer />
    </Layout>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
