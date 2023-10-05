import { useContext, useState } from "react";
import classes from "./Checkout.module.css";
import CartContext from "../store/cart-context";
import { Link, useNavigate } from "react-router-dom";
import Head from "../pages/Head";
import Button from "../components/UI/Button";

const Checkout = () => {
  const cartCtx = useContext(CartContext);
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const handlePurchase = async () => {
    if (address.trim() === "") {
      alert("Please enter address");
      return;
    }
    if (cartCtx.items.length) {
      const orderedItems = cartCtx.items;
      const userEmail = cartCtx.currentUserEmail;
      console.log(userEmail);
      const totalAmount = cartCtx.totalAmount;
      const orderDetails = {
        orderedItems,
        totalAmount,
        email: userEmail,
        address,
      };
      const response = await fetch("http://localhost:5000/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderDetails),
      });
      const result = await response.json();
      if (result.success) {
        cartCtx.clearCart();
        alert("Order Placed!");
        navigate("/");
      } else {
        alert("Server Error");
      }
      return;
    }
    alert("Please add at least one item in cart.");
  };
  console.log(cartCtx, "header cart button");
  const { items, totalAmount } = cartCtx;
  console.log(items, "itemsssss");
  return (
    <div className={classes.page}>
      <Head path={"/"} content={"Home"} />
      <div className={classes.container}>
        <h1>Checkout</h1>
        {items ? (
          <ul className={classes.allitems}>
            {items.map((item) => {
              return (
                <div>
                  <li className={classes.details} key={item.id}>
                    <img
                      className={classes.image}
                      width={70}
                      height={70}
                      src={`${import.meta.env.VITE_REACT_API_IMG_URL}/images/${
                        item.img
                      }`}
                    />
                    <div className={classes.itemdetail}>
                      <h3>Item Name :{item.name}</h3>
                      <p> Price: Rs. {item.price} </p>
                      <p>
                        No of Items:
                        <span
                          style={{
                            fontSize: "15px",
                            fontWeight: "bold",
                            padding: "0% 2% 0% 5%",
                          }}
                        >
                          x
                        </span>
                        {item.amount}
                      </p>
                    </div>
                  </li>
                  <hr />
                </div>
              );
            })}
            <p className={classes.total}>Total Price : Rs. {totalAmount}</p>
          </ul>
        ) : (
          <p>Cart is empty</p>
        )}
        <div className={classes.address}>
          <label htmlFor="address">Enter delivery address</label>
          <input
            id="address"
            type="text"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <Button onClick={handlePurchase} type="button">
            Place Order
          </Button>
          <Link to={"/"}>
            <Button type="button">Cancel</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
