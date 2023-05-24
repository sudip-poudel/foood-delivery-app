import { useContext } from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";
const MealItems = (props) => {
	const price = `$${props.price.toFixed(2)}`;
	const cartCtx = useContext(CartContext);
	const addToCarthandler = (amount) => {
		const item = {
			id: props.id,
			name: props.name,
			price: props.price,
			amount: amount,
		};
		cartCtx.addItem(item);
	};
	return (
		<li className={classes.meal}>
			<div>
				<h2 className={classes.name}>{props.name}</h2>
				<img src={props.img} alt="image" />
				<div className={classes.description}>{props.description}</div>
				<div className={classes.price}>{price}</div>
			</div>
			<div>
				<MealItemForm onAddToCart={addToCarthandler} />
			</div>
		</li>
	);
};
export default MealItems;
