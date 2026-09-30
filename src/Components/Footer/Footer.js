import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-main">

          {/* Brand */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              Shop<span>ly</span>
            </Link>

            <p>
              Your trusted online destination for quality
              products, great deals, and everyday essentials.
            </p>

            <div className="footer-social">
              <a href="#facebook" aria-label="Facebook">
                f
              </a>

              <a href="#instagram" aria-label="Instagram">
                ◎
              </a>

              <a href="#twitter" aria-label="Twitter">
                𝕏
              </a>

              <a href="#linkedin" aria-label="LinkedIn">
                in
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h3>Quick Links</h3>

            <Link to="/">Home</Link>

            <Link to="/products">
              All Products
            </Link>

            <Link to="/wishlist">
              Wishlist
            </Link>

            <Link to="/cart">
              Shopping Cart
            </Link>
          </div>

          {/* Customer Service */}
          <div className="footer-column">
            <h3>Customer Service</h3>

            <Link to="/products">
              Help Center
            </Link>

            <Link to="/products">
              Shipping & Delivery
            </Link>

            <Link to="/products">
              Returns & Refunds
            </Link>

            <Link to="/products">
              Contact Us
            </Link>
          </div>

          {/* Categories */}
          <div className="footer-column">
            <h3>Categories</h3>

            <Link to="/products?category=electronics">
              Electronics
            </Link>

            <Link to="/products?category=mens-shirts">
              Fashion
            </Link>

            <Link to="/products?category=beauty">
              Beauty
            </Link>

            <Link to="/products?category=home-decoration">
              Home & Kitchen
            </Link>
          </div>

        </div>

        <div className="footer-bottom">

          <p>
            © {currentYear} Shoply. All rights reserved.
          </p>

          <div className="footer-policies">
            <a href="#privacy">
              Privacy Policy
            </a>

            <a href="#terms">
              Terms & Conditions
            </a>

            <a href="#cookies">
              Cookie Policy
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;