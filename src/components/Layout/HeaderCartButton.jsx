import React, { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";
function HearderCartButton(props) {
	const cartCtx = useContext(CartContext);
	const [bump, setBump] = useState(false);
	const { items } = cartCtx;
	const cartItemsNumber = cartCtx.items.reduce((curAccVal, item) => {
		return curAccVal + item.amount;
	}, 0);
	const upclasses = `${classes.button} ${bump ? classes.bump : ""}`;
	useEffect(() => {
		if (items.length === 0) {
			return;
		}
		setBump(true);
		const timeout = setTimeout(() => {
			setBump(false);
		}, 300);
		return () => clearTimeout(timeout);
	}, [items]);
	return (
		<button onClick={props.onClick} className={upclasses}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>

			<span className={classes.badge}>{cartItemsNumber}</span>
		</button>
	);
}

export default HearderCartButton;
