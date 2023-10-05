import React, { useEffect, useState } from "react";
import classes from "./Order.module.css";
import Card from "../UI/Card";
const Order = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const getOrders = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_API_URL}/getorders`,
        {
          method: "get",
        }
      );
      const data = await response.json();
      setOrders(data);
      console.log(data);
    };
    getOrders();
  }, []);
  const handleOrderComplete = async (id) => {
    const verify = window.confirm("Are you sure the order is completed?");
    if (!verify) {
      return;
    } else {
      const data = await fetch(
        `${import.meta.env.VITE_REACT_API_URL}/deleteorder/${id}`,
        {
          method: "post",
        }
      );
      const response = await data.json();
      if (response.success) {
        alert(`${response.messege}`);
        window.location.reload();
      } else {
        alert(`${response.messege}`);
      }
      console.log(data);
    }
  };
  const orderData = orders.map((order) => {
    console.log(order.userid);
    const orderedItems = order.orderedIems.map((orderedItem) => {
      return (
        <div key={Math.random()} className={classes.orderitems}>
          <h3>Item: {orderedItem.name}</h3>
          <div className={classes.price}>
            <p>Price: Rs. {orderedItem.price}</p>
            <p>Amount: x{orderedItem.amount} </p>
          </div>
          <hr />
        </div>
      );
    });
    return (
      <div key={Math.random()} className={classes.container}>
        <h3> User: {order.userId}</h3>
        <h4>Address: {order.address}</h4>
        <div className={classes.card}>{orderedItems}</div>
        <h3>Total Amount: Rs. {order.totalAmount} </h3>
        <button
          type="button"
          onClick={handleOrderComplete.bind(null, order._id)}
        >
          <span>Order Complete</span>
        </button>
      </div>
    );
  });
  return (
    <>
      <div style={{ marginLeft: "22%" }}>{orderData}</div>
    </>
  );
};

export default Order;
