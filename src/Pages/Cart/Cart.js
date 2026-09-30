import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const navigate = useNavigate();
  const {
    cartItems,
    cartCount,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const shipping = cartTotal >= 50 || cartTotal === 0 ? 0 : 5;

  const total = cartTotal + shipping;

  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>

          <h1>Your Cart is Empty</h1>

          <p>Looks like you haven't added anything to your cart yet.</p>

          <Link to="/products" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="cart-header">
        <div>
          <h1>Shopping Cart</h1>

          <p>
            {cartCount} {cartCount === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <button className="clear-cart" onClick={clearCart}>
          Clear Cart
        </button>
      </div>

      <div className="cart-layout">
        {/* CART ITEMS */}

        <section className="cart-items">
          {cartItems.map((item) => (
            <article className="cart-item" key={item.id}>
              <Link to={`/products/${item.id}`} className="cart-item-image">
                <img src={item.thumbnail} alt={item.title} />
              </Link>

              <div className="cart-item-info">
                <span className="cart-item-category">{item.category}</span>

                <Link to={`/products/${item.id}`} className="cart-item-title">
                  {item.title}
                </Link>

                <div className="cart-item-rating">
                  <span>★</span>
                  {item.rating}
                </div>

                <div className="cart-item-price">${item.price.toFixed(2)}</div>

                <div className="cart-item-actions">
                  <div className="cart-quantity">
                    <button onClick={() => decreaseQuantity(item.id)}>−</button>

                    <span>{item.quantity}</span>

                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>

                  <button
                    className="remove-item"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="cart-item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </article>
          ))}
        </section>

        {/* SUMMARY */}

        <aside className="cart-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>

            <strong>${cartTotal.toFixed(2)}</strong>
          </div>

          <div className="summary-row">
            <span>Shipping</span>

            <strong>
              {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
            </strong>
          </div>

          {shipping === 0 && cartTotal > 0 && (
            <p className="free-shipping">🎉 You qualify for free shipping!</p>
          )}

          {cartTotal > 0 && cartTotal < 50 && (
            <p className="shipping-message">
              Add ${(50 - cartTotal).toFixed(2)} more for free shipping.
            </p>
          )}

          <div className="summary-divider"></div>

          <div className="summary-total">
            <span>Total</span>

            <strong>${total.toFixed(2)}</strong>
          </div>

          <button onClick={() => navigate("/checkout")}>
            Proceed to Checkout
          </button>

          <Link to="/products" className="continue-shopping-link">
            ← Continue Shopping
          </Link>
        </aside>
      </div>
    </main>
  );
}

export default Cart;
