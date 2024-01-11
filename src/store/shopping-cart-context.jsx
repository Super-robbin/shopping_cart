import { createContext } from "react";

// We import the context in App because is where all the other components that need the context are.

export const CartContext = createContext({
    items: []
});