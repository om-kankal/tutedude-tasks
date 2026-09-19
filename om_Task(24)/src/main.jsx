import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

function App() {
  return (
    <main style={styles.page}>
      <h1 style={styles.heading}>Hello, World!</h1>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#ffffff"
  },
  heading: {
    fontSize: "42px",
    color: "#222222",
    margin: 0
  }
};

createRoot(document.getElementById("root")).render(<App />);
