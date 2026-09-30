import { useNavigate } from "react-router-dom";

import "./NotFound.css";

function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="not-found-page">

      <div className="not-found-container">

        <div className="not-found-number">
          404
        </div>

        <h1>
          Page Not Found
        </h1>

        <p>
          Sorry, the page you're looking for
          doesn't exist or has been moved.
        </p>

        <div className="not-found-actions">

          <button
            onClick={() => navigate("/")}
          >
            Go to Home
          </button>

          <button
            className="secondary-button"
            onClick={() =>
              navigate("/products")
            }
          >
            Browse Products
          </button>

        </div>

      </div>

    </main>
  );
}

export default NotFound;