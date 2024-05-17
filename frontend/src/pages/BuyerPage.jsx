import { useState } from "react";
import Cart from "../components/Cart/Cart";
import Header from "../components/Layout/Header";
import Meals from "../components/Meals/Meals";
import Footer from "../components/Layout/Footer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shadcomp/ui/carousel";
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
      <div>
        <Carousel>
          <CarouselContent>
            <CarouselItem>...</CarouselItem>
            <CarouselItem>...</CarouselItem>
            <CarouselItem>...</CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <main>
        <Meals />
      </main>
      <Footer />
    </>
  );
};
export default BuyerPage;
