import { Link } from "react-router-dom";
import "./Brands.css";

function Brands() {
  const brands = [
    {
      name: "Apple",
      icon: "APPLE",
      query: "apple",
    },
    {
      name: "Samsung",
      icon: "S",
      query: "samsung",
    },
    {
      name: "Nike",
      icon: "✓",
      query: "nike",
    },
    {
      name: "Puma",
      icon: "P",
      query: "puma",
    },
    {
      name: "HP",
      icon: "HP",
      query: "hp",
    },
    {
      name: "Sony",
      icon: "SONY",
      query: "sony",
    },
  ];

  return (
    <section className="brands-section">
      <div className="brands-container">
        <div className="section-heading">
          <div>
            <span>SHOP YOUR FAVORITE BRANDS</span>

            <h2>Popular Brands</h2>

            <p>Explore products from brands you already love.</p>
          </div>

          <Link to="/products" className="view-all-link">
            View All →
          </Link>
        </div>

        <div className="brands-grid">
          {brands.map((brand) => (
            <Link
              key={brand.name}
              to={`/products?brand=${brand.query}`}
              className="brand-card"
            >
              <div className="brand-icon">{brand.icon}</div>

              <span>{brand.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Brands;
