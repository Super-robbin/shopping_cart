import { useContext } from "react";
import { CartContext } from "../store/shopping-cart-context";

// Step 1 - We import the CartContext in the file that wants to consume the context, that wants to access it.
// Step 2 - We import useContext, which allows us to use context.
// Step 3 - We create cartCtx and pass CartContext inside so it creates the connection.
// We can now replace items with cartCtx.items to access the items array inside the context object.
// We can also get rid of the items prop below because we don't need it anymore.
// IMPORTANT: In the app, Even though we're setting a default value here, you also must add a value prop
// to your cart context provider component.
// And here I'll set the value prop to an object that also has such an empty items array.
// So we do need to set that value prop and also provide our context value here.

export default function Cart({ onUpdateItemQuantity }) {
  const cartCtx = useContext(CartContext);

  const totalPrice = cartCtx.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  return (
    <div id="cart">
      {cartCtx.items.length === 0 && <p>No items in cart!</p>}
      {cartCtx.items.length > 0 && (
        <ul id="cart-items">
          {cartCtx.items.map((item) => {
            const formattedPrice = `$${item.price.toFixed(2)}`;

            return (
              <li key={item.id}>
                <div>
                  <span>{item.name}</span>
                  <span> ({formattedPrice})</span>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => onUpdateItemQuantity(item.id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onUpdateItemQuantity(item.id, 1)}>
                    +
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <p id="cart-total-price">
        Cart Total: <strong>{formattedTotalPrice}</strong>
      </p>
    </div>
  );
}
