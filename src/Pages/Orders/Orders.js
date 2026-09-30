import { useNavigate } from "react-router-dom";

import { useOrders } from "../../context/OrdersContext";

import "./Orders.css";

function Orders() {
  const { orders } = useOrders();

  const navigate = useNavigate();

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

  if (orders.length === 0) {
    return (
      <main className="orders-page">

        <div className="orders-empty">

          <div className="orders-empty-icon">
            📦
          </div>

          <h2>
            No Orders Yet
          </h2>

          <p>
            You haven't placed any orders yet.
          </p>

          <button
            onClick={() =>
              navigate("/products")
            }
          >
            Start Shopping
          </button>

        </div>

      </main>
    );
  }

  return (
    <main className="orders-page">

      <div className="orders-container">

        <div className="orders-header">

          <div>
            <h1>
              My Orders
            </h1>

            <p>
              View and track your recent orders
            </p>
          </div>

          <span className="orders-count">
            {orders.length}{" "}
            {orders.length === 1
              ? "Order"
              : "Orders"}
          </span>

        </div>

        <div className="orders-list">

          {orders.map((order) => (

            <div
              className="order-card"
              key={order.id}
            >

              <div className="order-top">

                <div>

                  <span className="order-label">
                    Order ID
                  </span>

                  <strong>
                    {order.id}
                  </strong>

                </div>

                <div>

                  <span className="order-label">
                    Order Date
                  </span>

                  <strong>
                    {formatDate(order.date)}
                  </strong>

                </div>

                <span className="order-status">
                  {order.status}
                </span>

              </div>

              <div className="order-items">

                {order.items.map((item) => (

                  <div
                    className="order-item"
                    key={item.id}
                  >

                    <img
                      src={item.thumbnail}
                      alt={item.title}
                    />

                    <div className="order-item-info">

                      <h3>
                        {item.title}
                      </h3>

                      <p>
                        Quantity:{" "}
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

                ))}

              </div>

              <div className="order-bottom">

                <div className="order-payment">

                  <span>
                    Payment
                  </span>

                  <strong>
                    {order.paymentMethod}
                  </strong>

                </div>

                <div className="order-total">

                  <span>
                    Total
                  </span>

                  <strong>
                    ${order.total.toFixed(2)}
                  </strong>

                </div>

              </div>

              {/* VIEW DETAILS */}

              <div className="order-details-button-wrapper">

                <button
                  className="view-order-button"
                  onClick={() =>
                    navigate(
                      `/orders/${order.id}`
                    )
                  }
                >
                  View Order Details
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}

export default Orders;