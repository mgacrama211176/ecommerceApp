import { createContext, useState, useEffect } from 'react';
import useStorage from './hooks/useStorage';

export const CartContext = createContext([]);

const CartInformation = (props) => {
  const { children } = props;
  const [cartItems, setCartItems] = useState([]);
  const cartInfoValue = { cartItems, setCartItems };
  const { items, setItems } = useStorage();

  useEffect(() => {
    setCartItems(items);
  }, []);

  use;

  return (
    <CartContext.Provider value={cartInfoValue}>
      {children}
    </CartContext.Provider>
  );
};

export default CartInformation;
