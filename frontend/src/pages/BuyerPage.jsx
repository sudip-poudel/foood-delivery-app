import { useState } from "react";
import Cart from "../components/Cart/Cart";
import Header from "../components/Layout/Header";
import Meals from "../components/Meals/Meals";
import CartProvider from "../store/CartProvider";
import Footer from "../components/Layout/Footer";
const BuyerPage = () => {
  const [showCart, setShowCart] = useState(false);
  const showCartHandler = () => {
    setShowCart(true);
  };
  const hideCartHandler = () => {
    setShowCart(false);
  };
  return (
    <CartProvider>
      {showCart && <Cart onClose={hideCartHandler} />}
      <Header onClick={showCartHandler} />
      <main>
        <Meals />
      </main>
      <Footer />
    </CartProvider>
  );
};
export default BuyerPage;
