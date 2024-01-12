import Product from "./components/Product.jsx";
import Header from "./components/Header.jsx";
import Shop from "./components/Shop.jsx";
import { DUMMY_PRODUCTS } from "./dummy-products.js";
import CartContextProvider from "./store/shopping-cart-context.jsx";

function App() {
  return (
    // We now replace the fragment with the context component. To be precise, we're going to access a property
    // on this context object that was created by React, that's called Provider and that will be the actual component that we will use.

    // IMPORTANT: Even though we're setting a default value here in the App, you also must add a value prop
    // to your cart context provider component. And here I'll set the value prop to an object that also has such an empty items array.
    // So we do need to set that value prop and also provide our context value here value={{ items: [] }}.
    // UPDATE: To link context with state, we replace value={{ items: [] }} with the state shoppingCart.
    // UPDATE 2: We created the context object above and we pass it as context value below.
    // UPDATE 3: We moved the entire code with funcions inside the shopping-cart-context.jsx, where we created the custom component
    // used below CartContextProvider. Check shopping-cart-context.jsx for reference.
    <CartContextProvider>
      <Header />
      {/* 
      We moved the code below from the Shop component, therefore we use it as a wrapper now and no longer with self-closing tag.
      We deleted onAddItemToCart={handleAddItemToCart} from the shop component below and inside the component we just pass {children},
      so that we can use it as a wrapper.
      We are therefore embracing COMPONENT COMPOSITION
      */}
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} />
          </li>
        ))}
      </Shop>
    </CartContextProvider>
  );
}

export default App;
