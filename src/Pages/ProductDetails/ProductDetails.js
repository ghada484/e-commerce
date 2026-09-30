import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useProducts } from "../../context/ProductsContext";
import { useToast } from "../../context/ToastContext";

import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();

  const { addToCart } = useCart();

  const {
    isInWishlist,
    toggleWishlist,
  } = useWishlist();

  const { products } = useProducts();

  const { showToast } = useToast();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `https://dummyjson.com/products/${id}`
        );

        setProduct(response.data);
        setSelectedImage(response.data.thumbnail);
        setQuantity(1);
      } catch (error) {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="details-state">
        <h2>Loading product...</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="details-state">
        <h2>Product not found.</h2>

        <Link
          to="/products"
          className="back-products"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  const oldPrice =
    product.price /
    (1 - product.discountPercentage / 100);

  const productInWishlist =
    isInWishlist(product.id);

  const relatedProducts = products
    .filter(
      (item) =>
        item.category === product.category &&
        item.id !== product.id
    )
    .slice(0, 4);

  const colors = [
    "Black",
    "White",
    "Blue",
    "Red",
  ];

  const sizes = [
    "S",
    "M",
    "L",
    "XL",
  ];

  const handleAddToCart = () => {
    if (product.stock === 0) {
      showToast(
        "This product is out of stock.",
        "error"
      );

      return;
    }

    addToCart(product, quantity);

    showToast(
      `${quantity} ${
        quantity === 1
          ? "item"
          : "items"
      } added to cart successfully.`,
      "success"
    );
  };

  const handleWishlist = () => {
    toggleWishlist(product);

    if (productInWishlist) {
      showToast(
        `${product.title} removed from wishlist.`,
        "info"
      );
    } else {
      showToast(
        `${product.title} added to wishlist.`,
        "success"
      );
    }
  };

  return (
    <main className="product-details-page">

      <Link
        to="/products"
        className="back-link"
      >
        ← Back to Products
      </Link>

      <div className="product-details">

        {/* IMAGES */}

        <div className="details-images">

          <div className="thumbnail-list">

            {product.images.map(
              (image, index) => (
                <button
                  key={index}
                  className={
                    selectedImage === image
                      ? "thumbnail active"
                      : "thumbnail"
                  }
                  onClick={() =>
                    setSelectedImage(image)
                  }
                >
                  <img
                    src={image}
                    alt={product.title}
                  />
                </button>
              )
            )}

          </div>

          <div className="main-product-image">

            <img
              src={selectedImage}
              alt={product.title}
            />

          </div>

        </div>

        {/* PRODUCT INFO */}

        <div className="details-info">

          <span className="details-category">
            {product.category}
          </span>

          <h1>{product.title}</h1>

          <div className="details-rating">

            <span className="stars">
              ★
            </span>

            <strong>
              {product.rating}
            </strong>

            <span>
              ({product.reviews?.length || 0} reviews)
            </span>

          </div>

          <p className="details-description">
            {product.description}
          </p>

          {/* PRICE */}

          <div className="details-price">

            <strong>
              ${product.price}
            </strong>

            <span>
              ${oldPrice.toFixed(2)}
            </span>

            <small>
              {Math.round(
                product.discountPercentage
              )}
              % OFF
            </small>

          </div>

          {/* STOCK */}

          <div className="details-stock">

            <span>●</span>

            {product.stock > 0
              ? `${product.stock} items available`
              : "Out of stock"}

          </div>

          {/* COLOR */}

          <div className="product-option">

            <span className="option-title">
              Color
            </span>

            <div className="option-buttons">

              {colors.map((color) => (

                <button
                  key={color}
                  className={
                    selectedColor === color
                      ? "option-button active"
                      : "option-button"
                  }
                  onClick={() =>
                    setSelectedColor(color)
                  }
                >
                  {color}
                </button>

              ))}

            </div>

          </div>

          {/* SIZE */}

          <div className="product-option">

            <span className="option-title">
              Size
            </span>

            <div className="option-buttons">

              {sizes.map((size) => (

                <button
                  key={size}
                  className={
                    selectedSize === size
                      ? "option-button active"
                      : "option-button"
                  }
                  onClick={() =>
                    setSelectedSize(size)
                  }
                >
                  {size}
                </button>

              ))}

            </div>

          </div>

          {/* QUANTITY */}

          <div className="quantity-section">

            <span>
              Quantity
            </span>

            <div className="quantity-control">

              <button
                onClick={() =>
                  setQuantity((prev) =>
                    Math.max(
                      1,
                      prev - 1
                    )
                  )
                }
              >
                −
              </button>

              <span>
                {quantity}
              </span>

              <button
                onClick={() =>
                  setQuantity((prev) =>
                    Math.min(
                      product.stock,
                      prev + 1
                    )
                  )
                }
                disabled={
                  quantity >=
                  product.stock
                }
              >
                +
              </button>

            </div>

          </div>

          {/* ACTIONS */}

          <div className="details-actions">

            <button
              className="add-details-cart"
              onClick={handleAddToCart}
              disabled={
                product.stock === 0
              }
            >
              {product.stock === 0
                ? "Out of Stock"
                : "Add to Cart"}
            </button>

            <button
              className={`add-wishlist ${
                productInWishlist
                  ? "active"
                  : ""
              }`}
              onClick={handleWishlist}
              aria-label="Add to wishlist"
            >
              {productInWishlist
                ? "♥"
                : "♡"}
            </button>

          </div>

          {/* FEATURES */}

          <div className="product-features">

            <div>
              <strong>
                🚚 Free Delivery
              </strong>

              <span>
                On orders over $50
              </span>
            </div>

            <div>
              <strong>
                ↩ Easy Returns
              </strong>

              <span>
                30-day return policy
              </span>
            </div>

            <div>
              <strong>
                🔒 Secure Payment
              </strong>

              <span>
                100% secure checkout
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* REVIEWS */}

      <section className="reviews-section">

        <div className="section-heading">

          <div>

            <span>
              CUSTOMER FEEDBACK
            </span>

            <h2>
              Customer Reviews
            </h2>

          </div>

        </div>

        <div className="reviews-list">

          {product.reviews &&
          product.reviews.length > 0 ? (

            product.reviews.map(
              (review, index) => (

                <article
                  className="review-card"
                  key={index}
                >

                  <div className="review-header">

                    <strong>
                      {review.reviewerName}
                    </strong>

                    <span>
                      ★ {review.rating}
                    </span>

                  </div>

                  <p>
                    {review.comment}
                  </p>

                  <small>
                    {new Date(
                      review.date
                    ).toLocaleDateString()}
                  </small>

                </article>

              )
            )

          ) : (

            <p className="no-reviews">
              No reviews available yet.
            </p>

          )}

        </div>

      </section>

      {/* RELATED PRODUCTS */}

      {relatedProducts.length > 0 && (

        <section className="related-section">

          <div className="section-heading">

            <div>

              <span>
                YOU MAY ALSO LIKE
              </span>

              <h2>
                Related Products
              </h2>

            </div>

            <Link
              to={`/products?category=${product.category}`}
              className="view-all-link"
            >
              View All →
            </Link>

          </div>

          <div className="related-grid">

            {relatedProducts.map(
              (item) => (

                <Link
                  key={item.id}
                  to={`/products/${item.id}`}
                  className="related-card"
                >

                  <div className="related-image">

                    <img
                      src={item.thumbnail}
                      alt={item.title}
                    />

                  </div>

                  <div className="related-info">

                    <span>
                      {item.category}
                    </span>

                    <h3>
                      {item.title}
                    </h3>

                    <div className="related-bottom">

                      <strong>
                        ${item.price}
                      </strong>

                      <span>
                        ★ {item.rating}
                      </span>

                    </div>

                  </div>

                </Link>

              )
            )}

          </div>

        </section>

      )}

    </main>
  );
}

export default ProductDetails;

