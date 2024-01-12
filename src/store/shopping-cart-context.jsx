import { createContext } from "react";

// We import the context in App because is where all the other components that need the context are.

// Whatever we pass here will help with autocompletion

export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {}
});
