import { useState } from "react";
import Cart from "../components/Cart/Cart";
import Header from "../components/Layout/Header";
import Meals from "../components/Meals/Meals";
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
    <>
      {showCart && <Cart onClose={hideCartHandler} />}
      <Header onClick={showCartHandler} />
      <main>
        <Meals />
      </main>
      <Footer />
    </>
  );
};
export default BuyerPage;
