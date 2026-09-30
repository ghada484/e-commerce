import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useAuth } from "./AuthContext";

const OrdersContext = createContext();

function OrdersProvider({ children }) {
  const { user } = useAuth();

  const [orders, setOrders] = useState(() => {
    const savedOrders =
      localStorage.getItem("shoply-orders");

    return savedOrders
      ? JSON.parse(savedOrders)
      : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "shoply-orders",
      JSON.stringify(orders)
    );
  }, [orders]);

  const createOrder = ({
    items,
    shippingInfo,
    paymentMethod,
    subtotal,
    shipping,
    total,
  }) => {
    if (!user) {
      return null;
    }

    const newOrder = {
      id: `ORD-${Date.now()}`,

      userId: user.id,
      userEmail: user.email,

      date: new Date().toISOString(),

      status: "Confirmed",

      items,

      shippingInfo,

      paymentMethod,

      subtotal,

      shipping,

      total,
    };

    setOrders((currentOrders) => [
      newOrder,
      ...currentOrders,
    ]);

    return newOrder;
  };

  const getUserOrders = () => {
    if (!user) {
      return [];
    }

    return orders.filter(
      (order) =>
        order.userId === user.id
    );
  };

  const getOrderById = (orderId) => {
    return orders.find(
      (order) =>
        order.id === orderId &&
        order.userId === user?.id
    );
  };

  return (
    <OrdersContext.Provider
      value={{
        orders: getUserOrders(),
        createOrder,
        getOrderById,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrdersContext);
}

export default OrdersProvider;