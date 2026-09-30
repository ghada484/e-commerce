import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import "./Profile.css";

function Profile() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <main className="profile-page">

      <div className="profile-container">

        <div className="profile-header">

          <div className="profile-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h1>
              My Profile
            </h1>

            <p>
              Manage your account information.
            </p>
          </div>

        </div>

        <div className="profile-content">

          <section className="profile-card">

            <div className="profile-card-header">
              <h2>
                Personal Information
              </h2>
            </div>

            <div className="profile-info">

              <div className="profile-info-row">
                <span>
                  Full Name
                </span>

                <strong>
                  {user?.name}
                </strong>
              </div>

              <div className="profile-info-row">
                <span>
                  Email Address
                </span>

                <strong>
                  {user?.email}
                </strong>
              </div>

              <div className="profile-info-row">
                <span>
                  Account Status
                </span>

                <strong className="active-status">
                  Active
                </strong>
              </div>

            </div>

          </section>

          <section className="profile-card">

            <div className="profile-card-header">
              <h2>
                Quick Links
              </h2>
            </div>

            <div className="profile-links">

              <Link to="/orders">
                <span>📦</span>
                <div>
                  <strong>
                    My Orders
                  </strong>
                  <small>
                    View your order history
                  </small>
                </div>
              </Link>

              <Link to="/wishlist">
                <span>♡</span>
                <div>
                  <strong>
                    My Wishlist
                  </strong>
                  <small>
                    View your saved products
                  </small>
                </div>
              </Link>

              <Link to="/cart">
                <span>🛒</span>
                <div>
                  <strong>
                    Shopping Cart
                  </strong>
                  <small>
                    View your current cart
                  </small>
                </div>
              </Link>

            </div>

          </section>

          <button
            className="profile-logout"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>

    </main>
  );
}

export default Profile;