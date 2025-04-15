import React, { useReducer, useContext, createContext } from 'react';

// Create separate contexts for cart state and dispatch
const CartStateContext = createContext([]);
const CartDispatchContext = createContext(() => {});

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          qty: parseInt(action.qty),
          size: action.size,
          price: action.price,
          img: action.img,
        },
      ];

    case 'REMOVE':
      const updatedCart = [...state];
      updatedCart.splice(action.index, 1);
      return updatedCart;

    case 'DROP':
      return [];

    case 'UPDATE':
      return state.map((item) => {
        if (item.id === action.id && item.size === action.size) {
          return {
            ...item,
            qty: item.qty + parseInt(action.qty),
            price: item.price + action.price,
          };
        }
        return item;
      });

    default:
      console.error('Unknown action type:', action.type);
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

// Custom hooks to use in components
export const useCart = () => useContext(CartStateContext) || [];
export const useDispatchCart = () => useContext(CartDispatchContext);
