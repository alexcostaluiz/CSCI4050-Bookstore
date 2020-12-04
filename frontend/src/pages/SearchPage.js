import React from 'react';

import { Breadcrumb, Col, Row } from 'antd';
import BookThumbnail from '../components/BookThumbnail.js';
import BookListing from '../components/BookListing.js';
import Header from '../components/Header.js'

import { Col, Row, Skeleton, Typography } from 'antd';

/**
 *  The page returning book search results 
 */
function SearchPage(props) {
    return (
      <Row>
          <Col className='searchpage-col' span={24}>
              <div key='searchpage-grid' className='searchpage-grid-container'>
                  <div className='search-grid-one'>
                      
                  </div>
              </div>
      </Row>       
    );
}

export default SearchPage;