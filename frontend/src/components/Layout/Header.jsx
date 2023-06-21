import { useEffect, useState } from "react";
import mealsImage from "../../assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import Button from "../UI/Button";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Header = (props) => {
	const notify = () =>
		toast("Logged Out", {
			position: "top-center",
			autoClose: 1000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: undefined,
			theme: "dark",
		});
	const navigatee = useNavigate();
	const [isLoggedIn, setIsLoggedin] = useState(false);
	useEffect(() => {
		const loginStatus = JSON.parse(localStorage.getItem("loggedin"));
		console.log(loginStatus);
		setIsLoggedin(loginStatus);
	}, []);
	const loginHandler = () => {
		navigatee("/login");
	};
	const logoutHandler = () => {
		localStorage.removeItem("loggedin");
		localStorage.removeItem("email");
		setIsLoggedin(false);
		notify();
	};
	return (
		<>
			<ToastContainer />
			<header className={classes.header}>
				<h1>
					<Link style={{ textDecoration: "none", color: "white" }} to="/">
						ReactMeals
					</Link>
				</h1>
				{isLoggedIn ? (
					<div style={{ display: "flex" }}>
						<HeaderCartButton onClick={props.onClick} />
						<Button type="button" onClick={logoutHandler}>
							Logout
						</Button>
					</div>
				) : (
					<Button type="button" onClick={loginHandler}>
						Login
					</Button>
				)}
				{/* <ToastContainer /> */}
			</header>
			<div className={classes["main-image"]}>
				<img src={mealsImage} alt="Meals.jpg" />
			</div>
		</>
	);
};

export default Header;
