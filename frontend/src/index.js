import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Layout } from 'antd';

import AdminPage from './pages/AdminPage.js';
import Authentication from './components/Authentication.js';
import BookPage from './pages/BookPage.js';
import CartPage from './pages/CartPage.js';
import CartService from './components/CartService.js';
import CheckoutPage from './pages/CheckoutPage.js';
import Footer from './components/Footer.js';
import Header from './components/Header.js';
import HomePage from './pages/HomePage.js';
import LoginPage from './pages/LoginPage.js';
import ManageBooksPage from './pages/ManageBooksPage.js';
import RegisterPage from './pages/RegisterPage.js';
import ProfilePage from './pages/ProfilePage.js';
import ScrollToTop from './components/ScrollToTop.js';
import OrderHistory from './pages/OrderHistory.js';
import ResetPassword from './pages/ResetPassword.js';
import ForgotPassword from './pages/ForgotPassword.js';

import * as serviceWorker from './serviceWorker';

const { Content } = Layout;

ReactDOM.render(
  <React.StrictMode>
      <Router>
        <Authentication>
        <ScrollToTop />
        <CartService>
          <Layout>
            <Header />
            <Content style={{ background: 'white' }}>
              <Switch>
                <Route path='/b/:slug'>
                  <BookPage />
                </Route>
                <Route path='/cart'>
                  <CartPage />
                </Route>
                <Route path='/checkout'>
                  <CheckoutPage />
                </Route>
                <Route path='/profile'>
                  <ProfilePage />
                </Route>
                <Route path='/orderhistory'>
                  <OrderHistory />
                </Route>
                <Route path='/login'>
                  <LoginPage />
                </Route>
                <Route path='/register'>
                  <RegisterPage />
                </Route>
                <Route path='/forgot-password'>
                  <ForgotPassword />
                </Route>
                <Route path='/reset-password'>
                  <ResetPassword />
                </Route>
                <Route path='/admin/manage/books'>
                  <ManageBooksPage />
                </Route>
                <Route path='/admin'>
                  <AdminPage />
                </Route>
                <Route path='/'>
                  <HomePage />
                </Route>
              </Switch>
            </Content>
            <Footer />
          </Layout>
        </CartService>
        </Authentication>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
