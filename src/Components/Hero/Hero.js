import { Link } from "react-router-dom";
import heroProduct from "../../assets/images/hero-product.png";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <span className="hero-label">
            NEW SEASON COLLECTION
          </span>

          <h1>
            Everything You Need,
            <span> All in One Place.</span>
          </h1>

          <p>
            Discover quality products, great deals, and
            everything you need for your everyday life.
          </p>

          <div className="hero-actions">
            <Link
              to="/products"
              className="hero-primary-button"
            >
              Shop Now
              <span>→</span>
            </Link>

            <Link
              to="/products"
              className="hero-secondary-button"
            >
              Explore Products
            </Link>
          </div>

          <div className="hero-features">
            <div>
              <strong>🚚 Free Shipping</strong>
              <span>On orders over $50</span>
            </div>

            <div>
              <strong>🔒 Secure Payment</strong>
              <span>100% secure checkout</span>
            </div>

            <div>
              <strong>↩ Easy Returns</strong>
              <span>30-day return policy</span>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <div className="hero-image-circle"></div>

          <img
            src={heroProduct}
            alt="Featured product"
          />

          <div className="hero-discount">
            <strong>UP TO</strong>
            <span>40%</span>
            <small>OFF</small>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;