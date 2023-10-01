import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItems from "./CartItems";
function Cart(props) {
  const navigate = useNavigate();
  const cartCtx = useContext(CartContext);
  console.log(cartCtx);
  const cartAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const cartRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const handleOrder = async () => {
    if (cartCtx.items.length) {
      navigate("/checkout");
    } else {
      alert("Please add at least one item in cart.");
    }
    /*
    if (cartCtx.items.length) {
      const orderedItems = cartCtx.items;
      const userEmail = cartCtx.currentUserEmail;
      const totalAmount = cartCtx.totalAmount;
      console.log("inside handleOrder", userEmail);

      const response = await fetch("http://localhost:5000/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderedItems,
          totalAmount,
          email: userEmail,
        }),
      });
      const result = await response.json();
      if (result.success) {
        cartCtx.clearCart();
        alert("Order Placed!");
      } else {
        alert("Server Error");
      }
      return;
    }
    alert("Please add at least one item in cart.");*/
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => {
        return (
          <CartItems
            key={item.id}
            price={item.price}
            amount={item.amount}
            name={item.name}
            onAdd={cartAddHandler.bind(null, item)}
            onRemove={cartRemoveHandler.bind(null, item.id)}
          />
        );
      })}
    </ul>
  );
  const totalAmount = cartCtx.totalAmount.toFixed(2);
  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total:</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onClose} className={classes["button--alt"]}>
          Close
        </button>
        <button className={classes.button} onClick={handleOrder}>
          Order
        </button>
      </div>
    </Modal>
  );
}

export default Cart;
