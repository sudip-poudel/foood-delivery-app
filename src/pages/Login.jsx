import React, { useEffect, useState } from "react";
import classes from "./Login.module.css";
import Button from "../components/UI/Button";
import { Link, useNavigate } from "react-router-dom";
export const Head = () => {
	return (
		<div className={classes.header}>
			<h1>
				<Link style={{ textDecoration: "none", color: "white" }} to="/">
					ReactMeals
				</Link>
			</h1>
			<Button type="button">Login as ADMIN</Button>
		</div>
	);
};
const Login = () => {
	const navigate = useNavigate();

	const initialValues = { email: "", password: "" };

	const [formValues, setFormValues] = useState(initialValues);

	const [formError, setFormError] = useState({});

	const [isSubmitted, setIsSubmitted] = useState(false);

	const onChange = (e) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};
	const validateForm = ({ email, password }) => {
		let errorMessage = {};
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
		if (email.length === 0) {
			errorMessage.email = "Please enter email";
		} else if (!regex.test(email)) {
			errorMessage.email = "Enter a valid email";
		}
		if (password.length === 0) {
			errorMessage.password = "Please enter password";
		} else if (password.length < 6) {
			errorMessage.password = "Password length must be at least 5 character";
		}
		return errorMessage;
	};

	const loginHandler = (e) => {
		e.preventDefault();
		const errors = validateForm(formValues);
		setFormError(errors);
		setIsSubmitted(true);
	};

	useEffect(() => {
		const handleRequest = async () => {
			const response = await fetch("http://localhost:5000/api/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: formValues.email,
					password: formValues.password,
				}),
			});
			const result = await response.json();
			if (!result.success) {
				return alert(result.messege);
			}
			if (
				isSubmitted &&
				Object.keys(formError).length === 0 &&
				result.success
			) {
				localStorage.setItem("loggedin", JSON.stringify(true));
				navigate("/");
			}
		};
		if (isSubmitted && Object.keys(formError).length === 0) {
			handleRequest();
		}
	}, [formError, isSubmitted]);

	console.log(formError, "FRMERR22");
	return (
		<>
			<Head />
			<div>
				<form className={classes.container} onSubmit={loginHandler}>
					<label htmlFor="email">E-Mail</label>
					<input id="email" type="text" name="email" onChange={onChange} />
					<p className={classes.error}>{formError.email}</p>
					<label htmlFor="password">Password</label>
					<input
						id="password"
						type="password"
						name="password"
						onChange={onChange}
					/>
					<p className={classes.error}>{formError.password}</p>
					<div className={classes.buttons}>
						<Button type="submit">Login</Button>
					</div>
					<p>
						Don't have an account?<Link to="/signup">Signup</Link>
					</p>
				</form>
			</div>
		</>
	);
};

export default Login;
