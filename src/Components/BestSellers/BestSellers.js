import { Link } from "react-router-dom";
import { useProducts } from "../../context/ProductsContext";
import { useCart } from "../../context/CartContext";
import "./BestSellers.css";

function BestSellers() {
  const { products, loading } = useProducts();
  const { addToCart } = useCart();

  const bestSellers = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  if (loading) {
    return (
      <section className="best-sellers-section">
        <div className="best-sellers-container">
          <div className="best-sellers-loading">
            Loading best sellers...
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="best-sellers-section">
      <div className="best-sellers-container">

        <div className="section-heading">
          <div>
            <span>OUR CUSTOMERS' FAVORITES</span>

            <h2>Best Sellers</h2>

            <p>
              Discover the products our customers love the most.
            </p>
          </div>

          <Link
            to="/products"
            className="view-all-link"
          >
            View All →
          </Link>
        </div>

        <div className="best-sellers-grid">
          {bestSellers.map((product) => (
            <article
              className="best-seller-card"
              key={product.id}
            >
              <div className="best-seller-image">

                <Link
                  to={`/products/${product.id}`}
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                  />
                </Link>

                <span className="best-seller-badge">
                  BEST SELLER
                </span>

                {product.discountPercentage > 0 && (
                  <span className="best-seller-discount">
                    -{Math.round(product.discountPercentage)}%
                  </span>
                )}
              </div>

              <div className="best-seller-info">

                <span className="best-seller-category">
                  {product.category}
                </span>

                <Link
                  to={`/products/${product.id}`}
                  className="best-seller-title"
                >
                  {product.title}
                </Link>

                <div className="best-seller-rating">
                  <span>★</span>

                  <strong>
                    {product.rating}
                  </strong>

                  <span className="best-seller-reviews">
                    Customer rating
                  </span>
                </div>

                <div className="best-seller-price">
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
                  className="best-seller-cart"
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

export default BestSellers;