import { BrowserRouter, Routes, Route } from "react-router-dom";
import OrdersProvider from "./context/OrdersContext";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";

import ProductsProvider from "./context/ProductsContext";
import CartProvider from "./context/CartContext";
import WishlistProvider from "./context/WishlistContext";
import AuthProvider from "./context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Profile from "./Pages/Profile/Profile";

import Home from "./Pages/Home/Home";
import Products from "./Pages/Products/Products";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Cart from "./Pages/Cart/Cart";
import Wishlist from "./Pages/Wishlist/Wishlist";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Checkout from "./Pages/Checkout/Checkout";
import Orders from "./Pages/Orders/Orders";
import OrderDetails from "./Pages/OrderDetails/OrderDetails";
import NotFound from "./Pages/NotFound/NotFound";
import ToastProvider from "./context/ToastContext";
function App() {
  return (
    <AuthProvider>
      <OrdersProvider>
        <ToastProvider>
        <WishlistProvider>
          <CartProvider>
            <ProductsProvider>
              <BrowserRouter>
                <Navbar />

                <Routes>
                  <Route path="/" element={<Home />} />

                  <Route path="/products" element={<Products />} />

                  <Route path="/products/:id" element={<ProductDetails />} />

                  <Route path="/cart" element={<Cart />} />

                  <Route path="/wishlist" element={<Wishlist />} />

                  <Route path="/login" element={<Login />} />

                  <Route path="/register" element={<Register />} />

                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/checkout"
                    element={
                      <ProtectedRoute>
                        <Checkout />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/orders/:id"
                    element={
                      <ProtectedRoute>
                        <OrderDetails />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/orders"
                    element={
                      <ProtectedRoute>
                        <Orders />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>

                <Footer />
              </BrowserRouter>
            </ProductsProvider>
          </CartProvider>
        </WishlistProvider>
        </ToastProvider>
      </OrdersProvider>
    </AuthProvider>
  );
}

export default App;
