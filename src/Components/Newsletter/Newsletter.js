import { useState } from "react";
import "./Newsletter.css";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email.trim()) {
      setMessage("Please enter your email address.");
      return;
    }

    setMessage("Thank you for subscribing!");

    setEmail("");
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-container">

        <div className="newsletter-content">
          <span>STAY UPDATED</span>

          <h2>
            Get the Latest Deals
            <br />
            Straight to Your Inbox.
          </h2>

          <p>
            Subscribe to our newsletter and never miss
            new arrivals, exclusive offers, and special deals.
          </p>
        </div>

        <div className="newsletter-form-wrapper">
          <form
            className="newsletter-form"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
            />

            <button type="submit">
              Subscribe
            </button>
          </form>

          {message && (
            <p className="newsletter-message">
              {message}
            </p>
          )}

          <small>
            By subscribing, you agree to receive our
            latest updates and offers.
          </small>
        </div>

      </div>
    </section>
  );
}

export default Newsletter;