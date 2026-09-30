import { Link } from "react-router-dom";
import "./Categories.css";

function Categories() {
  const categories = [
    {
      name: "Electronics",
      icon: "💻",
      description: "Smart tech & devices",
      query: "electronics",
    },
    {
      name: "Fashion",
      icon: "👕",
      description: "Style for every day",
      query: "mens-shirts",
    },
    {
      name: "Beauty",
      icon: "💄",
      description: "Beauty & personal care",
      query: "beauty",
    },
    {
      name: "Home & Kitchen",
      icon: "🏠",
      description: "Make your home better",
      query: "home-decoration",
    },
    {
      name: "Sports",
      icon: "⚽",
      description: "Gear for your lifestyle",
      query: "sports-accessories",
    },
    {
      name: "Groceries",
      icon: "🛒",
      description: "Fresh everyday essentials",
      query: "groceries",
    },
  ];

  return (
    <section className="categories-section">
      <div className="categories-container">
        <div className="section-heading">
          <div>
            <span>SHOP BY CATEGORY</span>

            <h2>Find What You Need</h2>

            <p>
              Explore our wide range of products
              across different categories.
            </p>
          </div>

          <Link
            to="/products"
            className="view-all-link"
          >
            View All →
          </Link>
        </div>

        <div className="categories-grid">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/products?category=${category.query}`}
              className="category-card"
            >
              <div className="category-icon">
                {category.icon}
              </div>

              <div className="category-info">
                <h3>{category.name}</h3>

                <p>{category.description}</p>

                <span>
                  Shop Now →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;