import React, { useContext } from 'react';

import OrderThumbnail from '../components/OrderThumbnail.js';
import Section from '../components/Section.js';
import Slider from '../components/Slider.js';
import AuthContext from '../contexts/AuthContext.js';

function OrderHistory(props) {
  const auth = useContext(AuthContext);
  return (
    <Section key='order-history' title='Buy Again'>
      <Slider itemWidth={216} spaceBetween={25}>
        {auth.user.orders.map((i) => (
          <div style={{ margin: '15px' }}>
            <OrderThumbnail key={i} order={i} />
          </div>
        ))}
      </Slider>
    </Section>
  );
}

export default OrderHistory;
