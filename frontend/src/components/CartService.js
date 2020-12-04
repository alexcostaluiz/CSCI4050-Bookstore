import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../contexts/AuthContext.js';
import DB from '../services/DatabaseService.js';
import CartContext from '../contexts/CartContext.js';

/**
 * A context provider which provides a user's cart information as well as an interface
 * to edit cart items.
 */
function CartService(props) {
  const auth = useContext(AuthContext);
  const [cart, setCart] = useState(auth.user != null ? auth.user.cart : []);
  useEffect(() => {
    if (auth.user != null && auth.user.id != null) {
      (async () => {
        let array = [];
        for (var item in auth.user.cart) {
          const book = await DB.fetchBook(item);
          const obj = {
            book: book,
            quantity: auth.user.cart[item],
          };
          array.push(obj);
        }
        setCart(array);
      })();
    }
  }, [auth]);

  const add = (item) => {
    if (auth.user.id != null) {
      DB.addToCart(item, auth);
    } else {
      cart.push(item);
      setCart([...cart]);
    }
  };

  const remove = (id) => {
    if (auth.user.id != null) {
      var book = {
        id: id,
      };
      DB.removeFromCart(book, auth);
    } else {
      const idx = indexOf(id);
      if (idx >= 0) {
        cart.splice(idx, 1);
        setCart([...cart]);
      }
    }
  };

  const indexOf = (id) => {
    for (let i = 0; i < cart.length; i++) {
      if (Number(cart[i].book.id) === Number(id)) return i;
    }
    return -1;
  };

  const updateItem = (item) => {
    if (auth.user.id != null) {
      DB.updateCartItemQuantity(item, auth);
    } else {
      //update for non logged user here
    }
  };

  const cartWrapper = {
    get: () => cart,
    add,
    remove,
    updateItem,
  };

  return (
    <CartContext.Provider value={cartWrapper}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartService;
