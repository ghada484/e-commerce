import { Link } from "react-router-dom";
import { useProducts } from "../../context/ProductsContext";
import { useCart } from "../../context/CartContext";
import "./NewArrivals.css";

function NewArrivals() {
  const { products, loading } = useProducts();
  const { addToCart } = useCart();

  const newProducts = [...products]
    .sort((a, b) => b.id - a.id)
    .slice(0, 4);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  if (loading) {
    return (
      <section className="new-arrivals-section">
        <div className="new-arrivals-container">
          <div className="new-arrivals-loading">
            Loading new arrivals...
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="new-arrivals-section">
      <div className="new-arrivals-container">

        <div className="section-heading">
          <div>
            <span>JUST LANDED</span>

            <h2>New Arrivals</h2>

            <p>
              Be the first to discover our latest products.
            </p>
          </div>

          <Link
            to="/products"
            className="view-all-link"
          >
            View All →
          </Link>
        </div>

        <div className="new-arrivals-grid">
          {newProducts.map((product) => (
            <article
              className="new-arrival-card"
              key={product.id}
            >
              <div className="new-arrival-image">

                <Link
                  to={`/products/${product.id}`}
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                  />
                </Link>

                <span className="new-badge">
                  NEW
                </span>

                {product.discountPercentage > 0 && (
                  <span className="new-discount">
                    -{Math.round(product.discountPercentage)}%
                  </span>
                )}
              </div>

              <div className="new-arrival-info">

                <span className="new-category">
                  {product.category}
                </span>

                <Link
                  to={`/products/${product.id}`}
                  className="new-title"
                >
                  {product.title}
                </Link>

                <div className="new-rating">
                  <span>★</span>

                  <strong>
                    {product.rating}
                  </strong>

                  <span className="new-rating-text">
                    Customer rating
                  </span>
                </div>

                <div className="new-price">
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
                  className="new-cart-button"
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

export default NewArrivals;