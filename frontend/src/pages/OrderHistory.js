import React from 'react';

import BookThumbnail from '../components/BookThumbnail.js';
import Section from '../components/Section.js';
import Slider from '../components/Slider.js';

function OrderHistory(props) {
  return (
    <Section key='order-history' title='Buy Again'>
      <Slider itemWidth={216} spaceBetween={16}>
        {Array.from({ length: 16 }, (e, i) => (
          <BookThumbnail key={i} />
        ))}
      </Slider>
    </Section>
  );
}

export default OrderHistory;
