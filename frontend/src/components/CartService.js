import React, { useContext, useState } from 'react';

import CartContext from '../contexts/CartContext.js';

/**
 * A context provider which provides a user's cart information as well as an interface
 * to edit cart items.
 */
function CartService(props) {
  const cartContext = useContext(CartContext);

  const [cart, setCart] = useState(cartContext);

  const add = (b) => {
    cart.push(b);
    setCart([...cart]);
  };

  const remove = (id) => {
    const idx = indexOf(id);
    if (idx >= 0) {
      cart.splice(idx, 1);
      setCart([...cart]);
    }
  };

  const indexOf = (id) => {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === id) return i;
    }
    return -1;
  };

  const cartWrapper = {
    get: () => cart,
    add,
    remove,
  };

  return (
    <CartContext.Provider value={cartWrapper}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartService;
