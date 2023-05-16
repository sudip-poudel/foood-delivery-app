import React, { useContext } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";
function HearderCartButton(props) {
	const cartCtx = useContext(CartContext);

	const cartItemsNumber = cartCtx.items.reduce((curAccVal, item) => {
		return curAccVal + item.amount;
	}, 0);
	return (
		<button onClick={props.onClick} className={classes.button}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>
			<span className={classes.badge}>{cartItemsNumber}</span>
		</button>
	);
}

export default HearderCartButton;
