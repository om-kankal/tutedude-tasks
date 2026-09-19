import React, { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext();

export const shoes = [
  {
    id: 1,
    name: "White Court Master",
    price: 79,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 2,
    name: "Black Street High",
    price: 99,
    image:
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 3,
    name: "Everyday Runner",
    price: 89,
    image:
      "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 4,
    name: "Sport Flex",
    price: 109,
    image:
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=700&q=80"
  }
];

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (shoe) => {
    setCart((items) => {
      const found = items.find((item) => item.id === shoe.id);

      if (found) {
        return items.map((item) =>
          item.id === shoe.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...items, { ...shoe, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((items) =>
      items
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => setCart([]);

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const value = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    total
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}