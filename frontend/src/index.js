import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Layout } from 'antd';

import BookPage from './pages/BookPage.js';
import CartPage from './pages/CartPage.js';
import CheckoutPage from './pages/CheckoutPage.js';
import Footer from './components/Footer.js';
import Header from './components/Header.js';
import HomePage from './pages/HomePage.js';
import ScrollToTop from './components/ScrollToTop.js';

import * as serviceWorker from './serviceWorker';

const { Content } = Layout;

const book = {
  author: 'Barack Obama',
  edition: null,
  image: 'https://kottke.org/plus/misc/images/obama-promised-land-book.jpg',
  isbn: '978-1-524-76316-9',
  numRatings: 4132,
  pages: 768,
  price: 34.99,
  publicationDate: 1605589200,
  publisher: 'Crown Publishing Group',
  rating: 4.1,
  tags: ['Nonfiction', 'Biography', 'Autobiography', 'Bestseller'],
  title: 'A Promised Land',
};
const cart = Array.from({ length: 3 }, (e) => book);

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
            <Route path='/cart'>
              <CartPage cart={cart} />
            </Route>
            <Route path='/checkout'>
              <CheckoutPage cart={cart} />
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
