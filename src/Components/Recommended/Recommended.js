import { Link } from "react-router-dom";
import { useProducts } from "../../context/ProductsContext";
import { useCart } from "../../context/CartContext";
import "./Recommended.css";

function Recommended() {
  const { products, loading } = useProducts();
  const { addToCart } = useCart();

  const recommendedProducts = [...products]
    .sort((a, b) => a.id - b.id)
    .slice(8, 12);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  if (loading) {
    return (
      <section className="recommended-section">
        <div className="recommended-container">
          <div className="recommended-loading">
            Loading recommendations...
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="recommended-section">
      <div className="recommended-container">

        <div className="section-heading">
          <div>
            <span>JUST FOR YOU</span>

            <h2>Recommended Products</h2>

            <p>
              Discover products selected for your everyday needs.
            </p>
          </div>

          <Link
            to="/products"
            className="view-all-link"
          >
            View All →
          </Link>
        </div>

        <div className="recommended-grid">
          {recommendedProducts.map((product) => (
            <article
              className="recommended-card"
              key={product.id}
            >
              <div className="recommended-image">

                <Link
                  to={`/products/${product.id}`}
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                  />
                </Link>

                <button
                  className="recommended-heart"
                  aria-label="Add to wishlist"
                >
                  ♡
                </button>

                {product.discountPercentage > 0 && (
                  <span className="recommended-discount">
                    -{Math.round(product.discountPercentage)}%
                  </span>
                )}
              </div>

              <div className="recommended-info">

                <span className="recommended-category">
                  {product.category}
                </span>

                <Link
                  to={`/products/${product.id}`}
                  className="recommended-title"
                >
                  {product.title}
                </Link>

                <div className="recommended-rating">
                  <span>★</span>

                  <strong>
                    {product.rating}
                  </strong>

                  <span>
                    ({product.reviews?.length || 0})
                  </span>
                </div>

                <div className="recommended-price">
                  <strong>
                    ${product.price.toFixed(2)}
                  </strong>

                  {product.discountPercentage > 0 && (
                    <span>
                      $
                      {(
                        product.price /
                        (1 -
                          product.discountPercentage / 100)
                      ).toFixed(2)}
                    </span>
                  )}
                </div>

                <button
                  className="recommended-cart"
                  onClick={() =>
                    handleAddToCart(product)
                  }
                >
                  Add to Cart
                </button>

              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Recommended;