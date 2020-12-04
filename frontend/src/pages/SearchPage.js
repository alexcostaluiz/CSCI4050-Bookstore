import React from 'react';

import BookListing from '../components/BookListing.js';
import SearchResult from '../components/SearchResult.js';
import { sampleBooks } from '../contexts/CartContext.js';

import { Col, Row } from 'antd';
import BookThumbnail from '../components/BookThumbnail.js';

/**
 *  The page returning book search results 
 */
function SearchPage(props) {
    const { books = sampleBooks } = props
    console.log(books);    
    return (

        <Row>
            <Col className='search-results'>
                
                {books.map(book => (
                    <SearchResult book={book} />
                ))}
            </Col>
        </Row>  
    )
    
}

export default SearchPage; 