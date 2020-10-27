import './CartList.less';

import React, { useContext } from 'react';

import { Typography } from 'antd';

import CartContext from '../contexts/CartContext.js';
import CartItem from './CartItem.js';

const { Title } = Typography;

/**
 * A cart component which lists a specified array of cart items.
 *
 * @param {?string} props.title An optional title for this component (default: "Cart").
 * @param {?boolean} props.readOnly True if this cart should not be editable; false otherwise.
 */
function CartList(props) {
  const { title = 'Cart', readOnly } = props;

  const cart = useContext(CartContext);

  console.log(cart.get());

  return (
    <div className='bookstore-cart-list'>
      <Title className='bookstore-cart-list-title'>{title}</Title>
      {cart.get().map((b, i) => (
        <CartItem key={i} book={b} readOnly={readOnly} />
      ))}
    </div>
  );
}

export default CartList;
