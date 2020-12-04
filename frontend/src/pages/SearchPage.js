import React from 'react';

import BookListing from '../components/BookListing.js';

import { sampleBooks } from '../contexts/CartContext.js';

import { Col, Row } from 'antd';

/**
 *  The page returning book search results 
 */
function SearchPage(props) {
    const { book = sampleBooks[Math.floor(Math.random() * sampleBooks.length)] } = props
    
    return result(book)
    
}

function result(book) {

    return (
        <Row>
            <Col span={24} className=''>
              <BookListing book></BookListing>
            </Col>
        </Row>       
    );
}

export default SearchPage;