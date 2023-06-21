import React, { useEffect, useState } from "react";
import classes from "./Order.module.css";
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
	const orderData = orders.map((order, i) => {
		console.log(order.userid);
		const orderedItems = order.orderedIems.map((orderedItem) => {
			return (
				<div className={classes.orderites}>
					<h3>Item: {orderedItem.name}</h3>
					<div className={classes.price}>
						<p>Price: {orderedItem.price}</p>
						<p>Amount: {orderedItem.amount} </p>
					</div>
					<button type="button">Completed</button>
				</div>
			);
		});
		return (
			<>
				<div className={classes.container}>
					<h1 key={i}> User: {order.userId}</h1>
					<div>{orderedItems}</div>
					<h3>Total Amount: {order.totalAmount} </h3>
				</div>
			</>
		);
	});
	return (
		<>
			<div>{orderData}</div>
		</>
	);
};

export default Order;
