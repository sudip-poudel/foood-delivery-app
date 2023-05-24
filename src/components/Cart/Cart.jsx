import React, { useContext } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItems from "./CartItems";
function Cart(props) {
	const cartCtx = useContext(CartContext);
	const cartAddHandler = (item) => {
		cartCtx.addItem({ ...item, amount: 1 });
	};
	const cartRemoveHandler = (id) => {
		cartCtx.removeItem(id);
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
				<button className={classes.button}>Order</button>
			</div>
		</Modal>
	);
}

export default Cart;
