import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Layout } from 'antd';

import BookPage from './pages/BookPage.js';
import Footer from './components/Footer.js';
import Header from './components/Header.js';
import HomePage from './pages/HomePage.js';
import ScrollToTop from './components/ScrollToTop.js';

import * as serviceWorker from './serviceWorker';

const { Content } = Layout;

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ScrollToTop />
      <Layout>
        <Header />
        <Content style={{ background: 'white' }}>
          <Switch>
            <Route path='/b/:slug'>
              <BookPage />
            </Route>
            <Route path='/'>
              <HomePage />
            </Route>
          </Switch>
        </Content>
        <Footer />
      </Layout>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
