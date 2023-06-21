import React from "react";
import classes from "./Buttons.module.css";
const Button = (props) => {
	return (
		<>
			<button className={classes.btn} type={props.type} onClick={props.onClick}>
				{props.children}
			</button>
		</>
	);
};

export default Button;
