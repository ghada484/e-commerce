import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";

import "./Navbar.css";

function Navbar() {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const {
    user,
    isAuthenticated,
    logout,
  } = useAuth();

  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();

    const searchValue = search.trim();

    if (!searchValue) {
      navigate("/products");
      return;
    }

    navigate(
      `/products?search=${encodeURIComponent(
        searchValue
      )}`
    );
  };

  // Clear search from URL when the input becomes empty
  useEffect(() => {
    if (search.trim() === "") {
      const currentPath = window.location.pathname;
      const currentSearch = window.location.search;

      if (
        currentPath === "/products" &&
        currentSearch.includes("search=")
      ) {
        navigate("/products");
      }
    }
  }, [search, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">

      <div className="navbar-top">

        {/* LOGO */}

        <Link
          to="/"
          className="navbar-logo"
        >
          Shop<span>ly</span>
        </Link>

        {/* SEARCH */}

        <form
          className="navbar-search"
          onSubmit={handleSearch}
        >

          <select defaultValue="all">

            <option value="all">
              All
            </option>

            <option value="electronics">
              Electronics
            </option>

            <option value="fashion">
              Fashion
            </option>

            <option value="home">
              Home
            </option>

            <option value="beauty">
              Beauty
            </option>

          </select>

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

          <button
            type="submit"
            aria-label="Search"
          >
            🔍
          </button>

        </form>

        {/* ACTIONS */}

        <div className="navbar-actions">

          {/* ACCOUNT */}

          {isAuthenticated ? (

            <div className="navbar-account logged-in">

              <Link
                to="/profile"
                className="account-link"
              >

                <span className="action-icon">
                  👤
                </span>

                <span className="account-info">

                  <small>
                    Hello, {user.name}
                  </small>

                  <strong>
                    Account
                  </strong>

                </span>

              </Link>

              <button
                className="logout-button"
                onClick={handleLogout}
              >
                Logout
              </button>

            </div>

          ) : (

            <Link
              to="/login"
              className="navbar-account"
            >

              <span className="action-icon">
                👤
              </span>

              <span>

                <small>
                  Hello, Sign in
                </small>

                <strong>
                  Account
                </strong>

              </span>

            </Link>

          )}

          {/* WISHLIST */}

          <Link
            to="/wishlist"
            className="navbar-action"
          >

            <span className="action-icon">
              ♡
            </span>

            <strong>
              Wishlist
            </strong>

            {wishlistCount > 0 && (
              <span className="wishlist-count">
                {wishlistCount}
              </span>
            )}

          </Link>

          {/* CART */}

          <Link
            to="/cart"
            className="navbar-cart"
          >

            <span className="action-icon">
              🛒
            </span>

            <strong>
              Cart
            </strong>

            {cartCount > 0 && (
              <span className="cart-count">
                {cartCount}
              </span>
            )}

          </Link>

        </div>

      </div>

      {/* MENU */}

      <nav className="navbar-menu">

        <div className="navbar-menu-container">

          <Link to="/products">
            All Products
          </Link>

          <Link to="/products?category=electronics">
            Electronics
          </Link>

          <Link to="/products?category=mens-shirts">
            Fashion
          </Link>

          <Link to="/products?category=home-decoration">
            Home & Kitchen
          </Link>

          <Link to="/products?category=beauty">
            Beauty
          </Link>

          <Link to="/products?category=sports-accessories">
            Sports
          </Link>

          <Link to="/products?category=groceries">
            Groceries
          </Link>

        </div>

      </nav>

    </header>
  );
}

export default Navbar;

