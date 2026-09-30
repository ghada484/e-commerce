import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useOrders } from "../../context/OrdersContext";
import { useToast } from "../../context/ToastContext";

import "./Checkout.css";

function Checkout() {
  const { cartItems, cartTotal, clearCart } =
    useCart();

  const { user } = useAuth();

  const { createOrder } = useOrders();

  const { showToast } = useToast();

  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] =
    useState({
      fullName: user?.name || "",
      email: user?.email || "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
    });

  const [paymentMethod, setPaymentMethod] =
    useState("Cash on Delivery");

  const [error, setError] = useState("");

  const shipping =
    cartTotal >= 100 ? 0 : 10;

  const total = cartTotal + shipping;

  const handleChange = (event) => {
    const { name, value } =
      event.target;

    setShippingInfo(
      (currentInfo) => ({
        ...currentInfo,
        [name]: value,
      })
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (cartItems.length === 0) {
      setError(
        "Your cart is empty."
      );

      return;
    }

    const {
      fullName,
      email,
      phone,
      address,
      city,
      postalCode,
    } = shippingInfo;

    if (
      !fullName ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !postalCode
    ) {
      setError(
        "Please fill in all shipping information."
      );

      return;
    }

    setError("");

    const newOrder =
      createOrder({
        items: cartItems,
        shippingInfo,
        paymentMethod,
        subtotal: cartTotal,
        shipping,
        total,
      });

    if (!newOrder) {
      setError(
        "Something went wrong. Please login again."
      );

      return;
    }

    clearCart();

    showToast(
      "Order placed successfully!",
      "success"
    );

    navigate("/orders");
  };

  if (cartItems.length === 0) {
    return (
      <main className="checkout-page">

        <div className="checkout-empty">

          <div className="empty-icon">
            🛒
          </div>

          <h2>
            Your cart is empty
          </h2>

          <p>
            Add some products before
            checking out.
          </p>

          <button
            onClick={() =>
              navigate("/products")
            }
          >
            Continue Shopping
          </button>

        </div>

      </main>
    );
  }

  return (
    <main className="checkout-page">

      <div className="checkout-container">

        <div className="checkout-header">

          <h1>
            Checkout
          </h1>

          <p>
            Complete your order information
          </p>

        </div>

        {error && (
          <div className="checkout-error">
            {error}
          </div>
        )}

        <div className="checkout-layout">

          {/* SHIPPING INFORMATION */}

          <section className="checkout-section">

            <h2>
              1. Shipping Information
            </h2>

            <form
              className="checkout-form"
              onSubmit={handleSubmit}
            >

              <div className="form-row">

                <div className="form-group">

                  <label>
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="fullName"
                    value={
                      shippingInfo.fullName
                    }
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />

                </div>

                <div className="form-group">

                  <label>
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={
                      shippingInfo.email
                    }
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />

                </div>

              </div>

              <div className="form-row">

                <div className="form-group">

                  <label>
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={
                      shippingInfo.phone
                    }
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                  />

                </div>

                <div className="form-group">

                  <label>
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={
                      shippingInfo.city
                    }
                    onChange={handleChange}
                    placeholder="Enter your city"
                  />

                </div>

              </div>

              <div className="form-group">

                <label>
                  Address
                </label>

                <input
                  type="text"
                  name="address"
                  value={
                    shippingInfo.address
                  }
                  onChange={handleChange}
                  placeholder="Street, building, apartment..."
                />

              </div>

              <div className="form-group">

                <label>
                  Postal Code
                </label>

                <input
                  type="text"
                  name="postalCode"
                  value={
                    shippingInfo.postalCode
                  }
                  onChange={handleChange}
                  placeholder="Enter postal code"
                />

              </div>

              {/* PAYMENT */}

              <h2 className="payment-title">
                2. Payment Method
              </h2>

              <div className="payment-options">

                <label
                  className={`payment-option ${
                    paymentMethod ===
                    "Cash on Delivery"
                      ? "selected"
                      : ""
                  }`}
                >

                  <input
                    type="radio"
                    name="payment"
                    value="Cash on Delivery"
                    checked={
                      paymentMethod ===
                      "Cash on Delivery"
                    }
                    onChange={(event) =>
                      setPaymentMethod(
                        event.target.value
                      )
                    }
                  />

                  <span>
                    💵
                  </span>

                  <div>
                    <strong>
                      Cash on Delivery
                    </strong>

                    <small>
                      Pay when your order arrives
                    </small>
                  </div>

                </label>

                <label
                  className={`payment-option ${
                    paymentMethod ===
                    "Card"
                      ? "selected"
                      : ""
                  }`}
                >

                  <input
                    type="radio"
                    name="payment"
                    value="Card"
                    checked={
                      paymentMethod ===
                      "Card"
                    }
                    onChange={(event) =>
                      setPaymentMethod(
                        event.target.value
                      )
                    }
                  />

                  <span>
                    💳
                  </span>

                  <div>
                    <strong>
                      Credit / Debit Card
                    </strong>

                    <small>
                      Secure card payment
                    </small>
                  </div>

                </label>

              </div>

              <button
                type="submit"
                className="place-order-button"
              >
                Place Order
              </button>

            </form>

          </section>

          {/* ORDER SUMMARY */}

          <aside className="checkout-summary">

            <h2>
              Order Summary
            </h2>

            <div className="checkout-items">

              {cartItems.map(
                (item) => (
                  <div
                    className="checkout-item"
                    key={item.id}
                  >

                    <img
                      src={
                        item.thumbnail
                      }
                      alt={item.title}
                    />

                    <div className="checkout-item-info">

                      <h3>
                        {item.title}
                      </h3>

                      <p>
                        Qty:{" "}
                        {item.quantity}
                      </p>

                      <strong>
                        $
                        {(
                          item.price *
                          item.quantity
                        ).toFixed(2)}
                      </strong>

                    </div>

                  </div>
                )
              )}

            </div>

            <div className="summary-line">

              <span>
                Subtotal
              </span>

              <strong>
                $
                {cartTotal.toFixed(2)}
              </strong>

            </div>

            <div className="summary-line">

              <span>
                Shipping
              </span>

              <strong>
                {shipping === 0
                  ? "FREE"
                  : `$${shipping.toFixed(
                      2
                    )}`}
              </strong>

            </div>

            <div className="summary-total">

              <span>
                Total
              </span>

              <strong>
                ${total.toFixed(2)}
              </strong>

            </div>

          </aside>

        </div>

      </div>

    </main>
  );
}

export default Checkout;

