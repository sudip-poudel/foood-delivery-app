import React from "react";
const CartContext = React.createContext({
	items: [],
	totalAmount: 0,
	currentUserEmail: "",
	addItem: (item) => {},
	removeItem: (id) => {},
	currUser: (email) => {},
});
export default CartContext;
