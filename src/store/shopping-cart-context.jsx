import { createContext, useReducer } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";

// The idea behind this useReducer hook is to use that same concept of reducing one or more values
// to a typically simpler value for state management purposes.
// Now the useReducer hook will then give you an array with exactly two elements,
// just as useState always gives you an array with two elements.
// The first element you'll get back will be your state that's managed by useReducer.
// The second value that will be part of this array, which you get back from useReducer
// will now not be a state updating function as you know it from useState,but instead a dispatch function
// which allows you to dispatch so-called actions that will then be handled by a to be defined reducer function.
// We import the context in App because is where all the other components that need the context are.

export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
});

// This reducer function should now accept two parameters, a state parameter and an action parameter.
// It will be called by React after you dispatched a so-called action.
// The action you will then dispatch with this dispatch function
// will indeed be the action you'll receive on that second parameter.
// The state you'll get here , on the other hand will be the guaranteed latest state snapshot
// of that state that is managed by useReducer.
const shoppingCartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const updatedItems = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.payload
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const product = DUMMY_PRODUCTS.find(
        (product) => product.id === action.payload
      );
      updatedItems.push({
        id: action.payload,
        name: product.title,
        price: product.price,
        quantity: 1,
      });
    }

    return {
      ...state, // not needed here because we only have one value
      items: updatedItems,
    };
  }
  if (action.type === "UPDATE_ITEM") {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === action.payload.productId
    );

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += action.payload.amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return {
      ...state,
      items: updatedItems,
    };
  }
  return state;
};

const CartContextProvider = ({ children }) => {
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    { items: [] }
  );

  function handleAddItemToCart(id) {
    shoppingCartDispatch({
      type: "ADD_ITEM",
      payload: id,
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    shoppingCartDispatch({
      type: "UPDATE_ITEM",
      payload: {
        productId: productId,
        amount: amount,
      },
    });
  }

  // We create ctxValue, which will be our context value, that has both the items array and the function to add items.
  // Whatever we pass here will help with autocompletion.
  const ctxValue = {
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
  };
  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
};

export default CartContextProvider;
