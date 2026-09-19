import React from "react";
import { BrowserRouter, Link, Route, Routes, NavLink } from "react-router-dom";
import { CartProvider, shoes, useCart } from "./CartContext";
import "./style.css";

function Navbar() {
  const { cart } = useCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <span className="brand-icon">👟</span>
        <span>Shoe Store</span>
      </Link>

      <nav>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/payment">Payment</NavLink>
        <Link to="/payment" className="cart-link">Cart ({count})</Link>
      </nav>
    </header>
  );
}

function Home() {
  const { addToCart, cart } = useCart();

  return (
    <section className="page">
      <div className="hero-copy">
        <div>
          <p className="eyebrow">Fresh pairs, simple checkout</p>
          <h1>Shoes for everyday miles.</h1>
          <p className="intro">
            Pick a pair, add it to your shared cart, then proceed to the
            payment page when you are ready.
          </p>
        </div>
        <Link to="/payment" className="outline-button">
          Go to Payment
        </Link>
      </div>

      <div className="store-layout">
        <div className="shoe-grid">
          {shoes.map((shoe) => {
            const item = cart.find((product) => product.id === shoe.id);

            return (
              <article className="shoe-card" key={shoe.id}>
                <img src={shoe.image} alt={shoe.name} />
                <div className="shoe-details">
                  <h2>{shoe.name}</h2>
                  <p>Comfort fit · daily wear</p>
                  <div className="shoe-bottom">
                    <strong>${shoe.price}</strong>
                    <button onClick={() => addToCart(shoe)}>
                      {item ? `Add More (${item.quantity})` : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <CartSummary />
      </div>
    </section>
  );
}

function CartSummary() {
  const { cart, total, removeFromCart, addToCart } = useCart();

  return (
    <aside className="summary">
      <div className="summary-top">
        <div>
          <p className="eyebrow">Your order</p>
          <h2>Cart</h2>
        </div>
        <span>{cart.length} item{cart.length === 1 ? "" : "s"}</span>
      </div>

      {cart.length === 0 ? (
        <div className="empty">
          <p>Your cart is empty.</p>
          <span>Add a shoe to continue.</span>
        </div>
      ) : (
        <div className="summary-list">
          {cart.map((item) => (
            <div className="summary-item" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="summary-item-main">
                <strong>{item.name}</strong>
                <span>${item.price} each</span>
                <div className="qty">
                  <button onClick={() => removeFromCart(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => addToCart(item)}>+</button>
                </div>
              </div>
              <b>${item.price * item.quantity}</b>
            </div>
          ))}
        </div>
      )}

      <div className="summary-total">
        <span>Total</span>
        <strong>${total}</strong>
      </div>

      <Link
        to="/payment"
        className={`pay-link ${cart.length === 0 ? "disabled" : ""}`}
        onClick={(e) => {
          if (cart.length === 0) e.preventDefault();
        }}
      >
        Proceed to Payment
      </Link>
    </aside>
  );
}

function Payment() {
  const { cart, total, removeFromCart, addToCart, clearCart } = useCart();
  const [paid, setPaid] = React.useState(false);

  const submitPayment = (event) => {
    event.preventDefault();

    if (cart.length === 0) {
      return;
    }

    setPaid(true);
    clearCart();
  };

  if (paid) {
    return (
      <section className="page centered">
        <div className="success-card">
          <div className="success-icon">✓</div>
          <p className="eyebrow">Payment complete</p>
          <h1>Thanks for your order.</h1>
          <p>Your payment was received and your shoes are on the way.</p>
          <Link to="/" className="dark-button">Back to Store</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page">
      <div className="payment-heading">
        <p className="eyebrow">Secure checkout</p>
        <h1>Payment</h1>
        <p>Review your cart and enter your card details below.</p>
      </div>

      <div className="payment-layout">
        <div className="payment-card">
          <div className="card-title">
            <h2>Your Cart</h2>
            <Link to="/">← Continue shopping</Link>
          </div>

          {cart.length === 0 ? (
            <div className="empty large">
              <p>No items in your cart.</p>
              <Link to="/" className="dark-button">Return to Store</Link>
            </div>
          ) : (
            <>
              <div className="payment-items">
                {cart.map((item) => (
                  <div className="payment-item" key={item.id}>
                    <img src={item.image} alt={item.name} />
                    <div>
                      <strong>{item.name}</strong>
                      <span>${item.price} each</span>
                      <div className="qty">
                        <button onClick={() => removeFromCart(item.id)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => addToCart(item)}>+</button>
                      </div>
                    </div>
                    <b>${item.price * item.quantity}</b>
                  </div>
                ))}
              </div>

              <div className="order-total">
                <span>Order total</span>
                <strong>${total}</strong>
              </div>
            </>
          )}
        </div>

        <div className="payment-form-card">
          <p className="eyebrow">Card payment</p>
          <h2>Credit Card Details</h2>

          <form onSubmit={submitPayment}>
            <label>
              Cardholder Name
              <input required type="text" placeholder="Alex Johnson" />
            </label>

            <label>
              Card Number
              <input
                required
                type="text"
                inputMode="numeric"
                maxLength="19"
                placeholder="1234 5678 9012 3456"
              />
            </label>

            <div className="split">
              <label>
                Expiry
                <input required type="text" placeholder="MM/YY" maxLength="5" />
              </label>

              <label>
                CVV
                <input required type="password" inputMode="numeric" maxLength="4" placeholder="123" />
              </label>
            </div>

            <button
              className="dark-button full"
              disabled={cart.length === 0}
              type="submit"
            >
              Pay ${total}
            </button>
          </form>

          <p className="secure-note">🔒 Demo checkout — no real payment is processed.</p>
        </div>
      </div>
    </section>
  );
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
        </main>
        <footer className="footer">Shoe Store · Context API practice project</footer>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;