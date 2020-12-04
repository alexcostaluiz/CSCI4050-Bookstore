import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import OrderListing from '../components/OrderListing.js';
import AuthContext from '../contexts/AuthContext.js';

function OrderPage(props) {
  const auth = useContext(AuthContext);
  const id = useLocation().pathname.substr(3);
  const [order, setOrder] = useState(null);
  useEffect(() => {
    if (auth.user == null) {
      return;
    }
    auth.user.orders.forEach((o) => {
      if (Number(o.id) === Number(id)) {
        setOrder(o);
        return;
      }
    });
  }, [auth, id]);

  if (order == null) {
    return <div />;
  } else {
    return <OrderListing order={order} />;
  }
}

export default OrderPage;
