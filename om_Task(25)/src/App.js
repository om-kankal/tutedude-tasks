import React, { useState } from "react";
import "./style.css";

const shoes = [
  {
    id: 1,
    name: "Air Run",
    price: 60,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 2,
    name: "Street Flex",
    price: 75,
    image: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 3,
    name: "Classic White",
    price: 55,
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 4,
    name: "Trail Pro",
    price: 90,
    image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 5,
    name: "Daily Comfort",
    price: 50,
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 6,
    name: "Runner X",
    price: 85,
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=700&q=80"
  }
];

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (shoe) => {
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === shoe.id);

      if (existing) {
        return currentCart.map((item) =>
          item.id === shoe.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...shoe, quantity: 1 }];
    });
  };

  const removeFromCart = (shoeId) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === shoeId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="app">
      <header className="navbar">
        <div className="logo">👟</div>
        <nav>
          <a href="#home">Home</a>
          <a href="#categories">Categories</a>
          <a href="#about">About Us</a>
        </nav>
      </header>

      <main className="store-layout">
        <section className="products-section" id="home">
          <div className="top-heading">
            <div>
              <p className="eyebrow">New collection</p>
              <h1>Choose your next pair</h1>
            </div>
            <div className="small-note">{shoes.length} shoes available</div>
          </div>

          <div className="products-grid" id="categories">
            {shoes.map((shoe) => (
              <article className="shoe-card" key={shoe.id}>
                <div className="shoe-image-wrap">
                  <img src={shoe.image} alt={shoe.name} />
                </div>
                <div className="shoe-info">
                  <div>
                    <h2>{shoe.name}</h2>
                    <p>Comfortable everyday style</p>
                  </div>
                  <div className="card-bottom">
                    <strong>${shoe.price.toFixed(2)}</strong>
                    <button onClick={() => addToCart(shoe)}>Add to Cart</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="cart-panel" id="about">
          <div className="cart-header">
            <h2>Cart</h2>
            <span>Total: ${total.toFixed(2)}</span>
          </div>

          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>No items yet.</p>
              <span>Add a shoe to see it here.</span>
            </div>
          ) : (
            <div className="cart-list">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <p>${item.price.toFixed(2)} each</p>
                    <div className="quantity-row">
                      <button onClick={() => removeFromCart(item.id)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => addToCart(item)}>+</button>
                    </div>
                  </div>
                  <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                </div>
              ))}
            </div>
          )}

          <div className="cart-total">
            <span>Cart Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>

          <button
            className="checkout-btn"
            disabled={cart.length === 0}
            onClick={() => alert("Thanks for your order!")}
          >
            Checkout
          </button>
        </aside>
      </main>
    </div>
  );
}

export default App;
