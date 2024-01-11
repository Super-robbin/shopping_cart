import { useState } from "react";
import Product from "./components/Product.jsx";
import Header from "./components/Header.jsx";
import Shop from "./components/Shop.jsx";
import { DUMMY_PRODUCTS } from "./dummy-products.js";
import { CartContext } from "./store/shopping-cart-context.jsx";

function App() {
  const [shoppingCart, setShoppingCart] = useState({
    items: [],
  });

  function handleAddItemToCart(id) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];

      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === id
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = DUMMY_PRODUCTS.find((product) => product.id === id);
        updatedItems.push({
          id: id,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }

      return {
        items: updatedItems,
      };
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === productId
      );

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      updatedItem.quantity += amount;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return {
        items: updatedItems,
      };
    });
  }

  return (
    // We now replace the fragment with the context component. To be precise, we're going to access a property
    // on this context object that was created by React, that's called Provider and that will be the actual component that we will use.

    // IMPORTANT: Even though we're setting a default value here in the App, you also must add a value prop
    // to your cart context provider component. And here I'll set the value prop to an object that also has such an empty items array.
    // So we do need to set that value prop and also provide our context value here.
    <CartContext.Provider value={{ items: [] }}>
      <Header
        cart={shoppingCart}
        onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
      />

      {/* 
      We moved the code below from the Shop component, therefore we use it as a wrapper now and no longer with self-closing tag.
      We deleted onAddItemToCart={handleAddItemToCart} from the shop component below and inside the component we just pass {children},
      so that we can use it as a wrapper.
      We are therefore embracing COMPONENT COMPOSITION
      */}
      <Shop onAddItemToCart={handleAddItemToCart}>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} onAddToCart={handleAddItemToCart} />
          </li>
        ))}
      </Shop>
    </CartContext.Provider>
  );
}

export default App;
