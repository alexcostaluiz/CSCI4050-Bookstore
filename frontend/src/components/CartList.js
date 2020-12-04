import './CartList.less';

import React, { useContext } from 'react';

import { Empty, Typography } from 'antd';
import CartItem from './CartItem.js';
import CartContext from '../contexts/CartContext.js';

const { Title } = Typography;

/**
 * A cart component which lists a specified array of cart items.
 *
 * @param {?string} props.title An optional title for this component (default: "Cart").
 * @param {?boolean} props.readOnly True if this cart should not be editable; false otherwise.
 */
function CartList(props) {
  const { title = 'Cart', orderCart, readOnly } = props;

  const cartContext = useContext(CartContext);
  
  const cart = orderCart ? { get: () => orderCart } : cartContext;

  return (
    <div className='bookstore-cart-list'>
      <Title className='bookstore-cart-list-title'>{title}</Title>
      {cart.get().length === 0 ? (
        <Empty
          description='Cart is empty.'
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      ) : (
        cart.get().map((i) => {
          return (
            <CartItem
              key={i.book.id}
              quantity={i.quantity}
              cart={cart}
              book={i.book}
              readOnly={readOnly}
            />
          );
        })
      )}
    </div>
  );
}

export default CartList;
