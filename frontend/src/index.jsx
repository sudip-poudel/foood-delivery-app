import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import CartProvider from "./store/CartProvider";
import AuthProvider from "./store/AuthContext";
import { CookiesProvider } from "react-cookie";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CookiesProvider>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </CookiesProvider>
);
