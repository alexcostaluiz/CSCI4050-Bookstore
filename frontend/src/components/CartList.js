import './CartList.less';

import React from 'react';

import { Typography } from 'antd';

import CartItem from './CartItem.js';

const { Title } = Typography;

/**
 * A cart component which lists a specified array of cart items.
 * 
 * @param {!Array<Object<string, *>>} props.cart An array of book objects from which cart
 *     items will be generated and listed.
 * @param {?string} props.title An optional title for this component (default: "Cart").
 * @param {?boolean} props.readOnly True if this cart should not be editable; false otherwise.
 */
function CartList(props) {
  const { cart, title = 'Cart', readOnly } = props;
  
  return (
    <div className='bookstore-cart-list'>
      <Title className='bookstore-cart-list-title'>{title}</Title>
      {cart.map((b, i) => (
        <CartItem key={i} {...b} readOnly={readOnly} />
      ))}
    </div>
  );
}

export default CartList;
