import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartItems = {
	items: [],
	totalAmount: 0,
};

const cartReducer = (state, action) => {
	if (action.type === "ADD") {
		const updatedTotalAmount =
			state.totalAmount + action.item.price * action.item.amount;
		const existingCartItemIndex = state.items.findIndex(
			(item) => item.id === action.item.id
		);
		const existingCartItem = state.items[existingCartItemIndex];
		let updatedCartItems;
		if (existingCartItem) {
			const updatedCartItem = {
				...existingCartItem,
				amount: existingCartItem.amount + action.item.amount,
			};
			updatedCartItems = [...state.items];
			updatedCartItems[existingCartItemIndex] = updatedCartItem;
		} else {
			updatedCartItems = state.items.concat(action.item);
		}
		return { items: updatedCartItems, totalAmount: updatedTotalAmount };
	}
	if (action.type === "REMOVE") {
		const existingCartItemIndex = state.items.findIndex(
			(item) => item.id === action.id
		);
		const existingCartItem = state.items[existingCartItemIndex];
		const updatedTotalAmount = state.totalAmount - existingCartItem.price;
		let updatedCartItems;
		if (existingCartItem.amount === 1) {
			updatedCartItems = state.items.filter((item) => item.id !== action.id);
		} else {
			const updatedCartItem = {
				...existingCartItem,
				amount: existingCartItem.amount - 1,
			};
			updatedCartItems = [...state.items];
			updatedCartItems[existingCartItemIndex] = updatedCartItem;
		}
		return { items: updatedCartItems, totalAmount: updatedTotalAmount };
	}
};

const CartProvider = (props) => {
	const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartItems);
	const addItemHandler = (item) => {
		dispatchCart({ type: "ADD", item: item });
	};
	const removeItemHandler = (id) => {
		dispatchCart({ type: "REMOVE", id: id });
	};
	const cartProvider = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemHandler,
		removeItem: removeItemHandler,
	};
	return (
		<CartContext.Provider value={cartProvider}>
			{props.children}
		</CartContext.Provider>
	);
};
export default CartProvider;
