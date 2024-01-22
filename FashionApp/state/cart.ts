import {createContext} from 'react';

export type CartItem = {
  id: number;
  quantity: number;
};

const Cart = createContext({
  cartItems: [] as CartItem[],
  setCartItems: undefined as unknown as React.Dispatch<
    React.SetStateAction<CartItem[]>
  >,
});

export default Cart;
