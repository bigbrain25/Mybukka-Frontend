import { useEffect, useReducer } from 'react';
// import axios from 'axios';
import constate from 'constate';
import logger from './Logger';
import { useSessionStorage } from '../hooks/useSession';

const SET_INPROGRESS_CART = 'SET_INPROGRESS_CART';
const CLEAR_INPROGRESS_CART = 'CLEAR_INPROGRESS_CART';
const SET_INCREMENT = 'SET_INCREMENT';
const SET_DECREMENT = 'SET_DECREMENT';

const initialState = {
  cart: [],
  total: 0,
  totalCost: 0,
  inProgressCart: {
    products: [],
    totalCost: 0, // total submenus cost
    quantity: 1,
    originalCost: 0 // total base price product cost
  },
};

const reducer = (originalState, action) => {
  const state = Object.assign({}, originalState);
  switch (action.type) {
    case `${SET_INPROGRESS_CART}`: {
      const { inProgressProducts: products, totalCost } = action.payload;
      return { ...state, inProgressCart: { ...state.inProgressCart, totalCost, products } };
    }

    case `${CLEAR_INPROGRESS_CART}`: {
      return { ...state, inProgressCart: { totalCost: 0, originalCost: 0, quantity: 1, products: [] } };
    }

    case `${SET_INCREMENT}`: {
      const inProgressCart = state.inProgressCart;
      const quantity = inProgressCart.quantity + 1;
      const originalCost = action.price * quantity;
      return { ...state, inProgressCart: { ...inProgressCart, originalCost, quantity } };
    }

    case `${SET_DECREMENT}`: {
      const inProgressCart = state.inProgressCart;
      const initQty = inProgressCart.quantity;
      const quantity = initQty > 1 ? initQty - 1 : initQty;
      const originalCost = action.price * quantity;
      return { ...state, inProgressCart: { ...inProgressCart, originalCost, quantity } };
    }

    case 'ADD_PRODUCT': {
      const id = action.payload.product.id;
      let addedProduct = state.cart.find(product => product.id === id);

      if (addedProduct) {
        return {
          ...state,
          cart: state.cart.map((product) => {
            const productCopy = Object.assign({}, product);
            if (productCopy.id === id) productCopy.quantity += 1;
            return productCopy;
          }),
          total: state.total + addedProduct.price
        };
      }
      addedProduct = action.payload.product;
      addedProduct.quantity = 1;

      return {
        ...state,
        cart: [...state.cart, addedProduct],
        total: state.total + addedProduct.price
      };
    }

    case 'DEL_PRODUCT': {
      const removedProduct = state.cart.find(product => product.id === action.payload);
      const updatedCart = state.cart.filter(product => product.id !== action.payload);
      const newTotal = state.total - (removedProduct.price * removedProduct.quantity);

      return {
        ...state,
        cart: updatedCart,
        total: newTotal
      };
    }

    default: {
      return state;
    }
  }
};

const loggerReducer = logger(reducer);

const useCart = () => {
  const [data, setData] = useSessionStorage('cart', initialState);
  const [state, dispatch] = useReducer(loggerReducer, data);

  useEffect(() => {
    setData(state);
  }, [state]);

  const setInProgressProduct = (products, submenus) => {
    const newProducts = products.submenus.map(({ _id, ...items }) => {
      if (submenus[_id].length > 0) {
        return { ...items, _id, options: submenus[_id] };
      }
      return { _id: null };
    }, []);
    // remove empty products
    return newProducts.filter(({ _id }) => _id !== null);
  };

  const setInProgressCart = (products, mainProducts) => {
    let total = 0, inProgressProducts = [];
    const categories = Object.keys(products);
    const isEmpty = categories.reduce((val, item) => (products[item].length + val), 0) < 1;

    if (!isEmpty) {
      inProgressProducts = setInProgressProduct(mainProducts, products);

      total = categories.reduce((totl, group) =>
        (products[group].reduce((initVal, { price }) => initVal + price, 0) + totl)
      , 0);
    }

    dispatch({
      type: SET_INPROGRESS_CART,
      payload: { totalCost: total, inProgressProducts },
    });
  };

  const clearInProgressCart = () => {
    dispatch({
      type: CLEAR_INPROGRESS_CART,
    });
  };

  const setIncrementInProgressCart = (price) => {
    dispatch({
      type: SET_INCREMENT,
      price
    });
  };

  const setDecrementInProgressCart = (price) => {
    dispatch({
      type: SET_DECREMENT,
      price
    });
  };

  const { cart, inProgressCart, totalCost, originalCost } = state;

  return { cart, inProgressCart, totalCost, originalCost, clearInProgressCart, setInProgressCart, setIncrementInProgressCart, setDecrementInProgressCart };
};

export const [CartProvider, useCartContext] = constate(useCart);
