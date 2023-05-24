import React, { useRef, useState } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";

function MealItemForm(props) {
	const [amountIsValid, setAmountIsValid] = useState(true);
	const enteredAmountRef = useRef();
	const submitHandler = (event) => {
		event.preventDefault();
		const enteredAmount = +enteredAmountRef.current.value;
		if (isNaN(enteredAmount) || enteredAmount < 1 || enteredAmount > 5) {
			setAmountIsValid(false);
			return;
		}
		setAmountIsValid(true);
		props.onAddToCart(enteredAmount);
	};
	return (
		<form className={classes.form} onSubmit={submitHandler}>
			<Input
				ref={enteredAmountRef}
				label="Amount"
				input={{
					id: "amount",
					type: "number",
					min: "1",
					max: "5",
					step: "1",
					defaultValue: "1",
				}}
			/>
			<button>+Add</button>
			{!amountIsValid && <p>Amount should be 1-5.</p>}
		</form>
	);
}

export default MealItemForm;
