import './SearchPage.less';

import React from 'react';

import { useLocation } from 'react-router-dom';

import BrowsePage from './BrowsePage.js';

/**
 *  The page returning book search results
 */
function SearchPage(props) {
  const location = useLocation();
  const { query, books } = location.state;
  
  return (
    <BrowsePage results={books} title={'Search Results for "' + query + '"'} />
  );
}

export default SearchPage;
