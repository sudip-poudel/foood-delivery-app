import mealsImage from "../../assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import Button from "../UI/Button";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import useAuth from "../../../hooks/useAuth";
import { useCookies } from "react-cookie";

const Header = (props) => {
  const { auth, setAuth } = useAuth();
  const [, , removeCookie] = useCookies(["authToken"]);
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

  const loginHandler = () => {
    navigatee("/login");
  };

  const logoutHandler = () => {
    removeCookie(["authToken"]);
    setAuth({});
    notify();
    window.location.reload();
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
        {auth.user ? (
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
