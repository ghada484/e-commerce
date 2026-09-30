import { Link } from "react-router-dom";
import { useProducts } from "../../context/ProductsContext";
import { useCart } from "../../context/CartContext";
import "./FlashDeals.css";

function FlashDeals() {
  const { products, loading } = useProducts();
  const { addToCart } = useCart();

  const flashDeals = [...products]
    .filter((product) => product.discountPercentage > 10)
    .sort(
      (a, b) =>
        b.discountPercentage - a.discountPercentage
    )
    .slice(0, 4);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  if (loading) {
    return (
      <section className="flash-deals-section">
        <div className="flash-deals-container">
          <div className="flash-deals-loading">
            Loading deals...
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="flash-deals-section">
      <div className="flash-deals-container">

        <div className="section-heading">
          <div>
            <span>LIMITED TIME OFFERS</span>

            <h2>Flash Deals</h2>

            <p>
              Grab your favorite products before the deals
              are gone.
            </p>
          </div>

          <Link
            to="/products"
            className="view-all-link"
          >
            View All →
          </Link>
        </div>

        <div className="flash-deals-grid">
          {flashDeals.map((product) => {
            const oldPrice =
              product.price /
              (1 - product.discountPercentage / 100);

            return (
              <article
                className="flash-deal-card"
                key={product.id}
              >
                <div className="flash-deal-image">

                  <Link
                    to={`/products/${product.id}`}
                  >
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                    />
                  </Link>

                  <span className="flash-discount">
                    -{Math.round(product.discountPercentage)}%
                  </span>

                  <span className="flash-label">
                    FLASH DEAL
                  </span>
                </div>

                <div className="flash-deal-info">

                  <span className="flash-category">
                    {product.category}
                  </span>

                  <Link
                    to={`/products/${product.id}`}
                    className="flash-title"
                  >
                    {product.title}
                  </Link>

                  <div className="flash-rating">
                    <span>★</span>
                    <strong>{product.rating}</strong>
                    <span className="rating-text">
                      Excellent
                    </span>
                  </div>

                  <div className="flash-price">
                    <strong>
                      ${product.price.toFixed(2)}
                    </strong>

                    <span>
                      ${oldPrice.toFixed(2)}
                    </span>
                  </div>

                  <button
                    className="flash-cart-button"
                    onClick={() =>
                      handleAddToCart(product)
                    }
                  >
                    Add to Cart
                  </button>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default FlashDeals;