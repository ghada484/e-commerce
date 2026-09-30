import { Link } from "react-router-dom";

import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

import "./Wishlist.css";

function Wishlist() {
  const {
    wishlistItems,
    removeFromWishlist,
    clearWishlist,
  } = useWishlist();

  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  if (wishlistItems.length === 0) {
    return (
      <main className="wishlist-page">

        <div className="empty-wishlist">

          <div className="empty-wishlist-icon">
            ♡
          </div>

          <h1>
            Your Wishlist is Empty
          </h1>

          <p>
            Save your favorite products here
            and come back to them anytime.
          </p>

          <Link
            to="/products"
            className="continue-shopping"
          >
            Explore Products
          </Link>

        </div>

      </main>
    );
  }

  return (
    <main className="wishlist-page">

      <div className="wishlist-header">

        <div>

          <h1>
            My Wishlist
          </h1>

          <p>
            {wishlistItems.length}{" "}
            {wishlistItems.length === 1
              ? "item"
              : "items"}{" "}
            saved
          </p>

        </div>

        <button
          className="clear-wishlist"
          onClick={clearWishlist}
        >
          Clear Wishlist
        </button>

      </div>

      <div className="wishlist-grid">

        {wishlistItems.map((product) => (

          <article
            className="wishlist-card"
            key={product.id}
          >

            <button
              className="remove-wishlist"
              onClick={() =>
                removeFromWishlist(
                  product.id
                )
              }
              aria-label="Remove from wishlist"
            >
              ×
            </button>

            <Link
              to={`/products/${product.id}`}
              className="wishlist-image"
            >

              <img
                src={product.thumbnail}
                alt={product.title}
              />

            </Link>

            <div className="wishlist-info">

              <span className="wishlist-category">
                {product.category}
              </span>

              <Link
                to={`/products/${product.id}`}
                className="wishlist-title"
              >
                {product.title}
              </Link>

              <div className="wishlist-rating">

                <span>★</span>

                {product.rating}

              </div>

              <div className="wishlist-bottom">

                <strong>
                  ${product.price}
                </strong>

                <button
                  className="wishlist-cart-button"
                  onClick={() =>
                    handleAddToCart(
                      product
                    )
                  }
                  disabled={
                    product.stock === 0
                  }
                >
                  {product.stock === 0
                    ? "Out of Stock"
                    : "Add to Cart"}
                </button>

              </div>

            </div>

          </article>

        ))}

      </div>

    </main>
  );
}

export default Wishlist;