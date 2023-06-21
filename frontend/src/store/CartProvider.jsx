import React, { useEffect, useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartItems = {
	items: [],
	totalAmount: 0,
	currentUserEmail: "",
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
		return {
			...state,
			items: updatedCartItems,
			totalAmount: updatedTotalAmount,
		};
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
		return {
			...state,
			items: updatedCartItems,
			totalAmount: updatedTotalAmount,
		};
	}
	if (action.type === "CLEAR") {
		return { ...state, items: [], totalAmount: 0 };
	}
	if (action.type === "SETUSER") {
		return { ...state, currentUserEmail: action.email };
	}
};

const CartProvider = (props) => {
	const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartItems);
	useEffect(() => {
		console.log("in caert state");
		const email = window.localStorage.getItem("email");
		if (email) {
			currentUserEmailHandler(email);
			console.log(email);
		}
	}, []);
	const addItemHandler = (item) => {
		dispatchCart({ type: "ADD", item: item });
	};
	const removeItemHandler = (id) => {
		dispatchCart({ type: "REMOVE", id: id });
	};
	const clearCartHandler = () => {
		dispatchCart({ type: "CLEAR" });
	};
	const currentUserEmailHandler = (email) => {
		dispatchCart({ type: "SETUSER", email });
	};
	const cartProvider = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		currentUserEmail: cartState.currentUserEmail,
		addItem: addItemHandler,
		removeItem: removeItemHandler,
		clearCart: clearCartHandler,
		currUser: currentUserEmailHandler,
	};
	return (
		<CartContext.Provider value={cartProvider}>
			{props.children}
		</CartContext.Provider>
	);
};
export default CartProvider;
