import { useNavigate, useParams } from "react-router-dom";

import { useOrders } from "../../context/OrdersContext";

import "./OrderDetails.css";

function OrderDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { getOrderById } = useOrders();

  const order = getOrderById(id);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
  };

  if (!order) {
    return (
      <main className="order-details-page">

        <div className="order-not-found">

          <div>
            📦
          </div>

          <h2>
            Order Not Found
          </h2>

          <p>
            The order you're looking for doesn't exist.
          </p>

          <button
            onClick={() =>
              navigate("/orders")
            }
          >
            Back to Orders
          </button>

        </div>

      </main>
    );
  }

  return (
    <main className="order-details-page">

      <div className="order-details-container">

        {/* HEADER */}

        <div className="order-details-header">

          <button
            className="back-orders-button"
            onClick={() =>
              navigate("/orders")
            }
          >
            ← Back to Orders
          </button>

          <div>

            <h1>
              Order Details
            </h1>

            <p>
              Order #{order.id}
            </p>

          </div>

          <span className="order-status large">
            {order.status}
          </span>

        </div>

        {/* ORDER INFO */}

        <div className="order-info-grid">

          <div className="order-info-card">

            <h2>
              Order Information
            </h2>

            <div className="info-row">

              <span>
                Order ID
              </span>

              <strong>
                {order.id}
              </strong>

            </div>

            <div className="info-row">

              <span>
                Order Date
              </span>

              <strong>
                {formatDate(order.date)}
              </strong>

            </div>

            <div className="info-row">

              <span>
                Payment Method
              </span>

              <strong>
                {order.paymentMethod}
              </strong>

            </div>

            <div className="info-row">

              <span>
                Status
              </span>

              <strong className="confirmed-text">
                {order.status}
              </strong>

            </div>

          </div>

          {/* SHIPPING */}

          <div className="order-info-card">

            <h2>
              Shipping Address
            </h2>

            <p className="shipping-name">
              {order.shippingInfo.fullName}
            </p>

            <p>
              {order.shippingInfo.address}
            </p>

            <p>
              {order.shippingInfo.city}
            </p>

            <p>
              Postal Code:{" "}
              {order.shippingInfo.postalCode}
            </p>

            <p>
              Phone:{" "}
              {order.shippingInfo.phone}
            </p>

            <p>
              Email:{" "}
              {order.shippingInfo.email}
            </p>

          </div>

        </div>

        {/* PRODUCTS */}

        <section className="ordered-products">

          <h2>
            Ordered Products
          </h2>

          <div className="ordered-products-list">

            {order.items.map((item) => (

              <div
                className="ordered-product"
                key={item.id}
              >

                <img
                  src={item.thumbnail}
                  alt={item.title}
                />

                <div className="ordered-product-info">

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.category}
                  </p>

                  <span>
                    Quantity: {item.quantity}
                  </span>

                </div>

                <strong>
                  $
                  {(
                    item.price *
                    item.quantity
                  ).toFixed(2)}
                </strong>

              </div>

            ))}

          </div>

        </section>

        {/* TOTAL */}

        <div className="order-summary-details">

          <div className="summary-detail-row">

            <span>
              Subtotal
            </span>

            <strong>
              ${order.subtotal.toFixed(2)}
            </strong>

          </div>

          <div className="summary-detail-row">

            <span>
              Shipping
            </span>

            <strong>
              {order.shipping === 0
                ? "FREE"
                : `$${order.shipping.toFixed(2)}`}
            </strong>

          </div>

          <div className="summary-detail-total">

            <span>
              Total
            </span>

            <strong>
              ${order.total.toFixed(2)}
            </strong>

          </div>

        </div>

      </div>

    </main>
  );
}

export default OrderDetails;