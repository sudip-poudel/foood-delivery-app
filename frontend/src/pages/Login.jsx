import React, { useContext, useEffect, useState } from "react";
import classes from "./Login.module.css";
import Button from "../components/UI/Button";
import { Link, useNavigate } from "react-router-dom";
import Head from "./Head";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

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
      // const response = await fetch(
      //   `${import.meta.env.VITE_REACT_API_URL}/login`,
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     withCredentials: true,
      //     body: JSON.stringify({
      //       email: formValues.email.toLowerCase(),
      //       password: formValues.password,
      //     }),
      //   }
      // );
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_API_URL}/login`,
        {
          email: formValues.email.toLowerCase(),
          password: formValues.password,
        },
        { withCredentials: true }
      );
      const result = await response.data;
      if (!result.success) {
        return alert(result.messege);
      }
      if (
        isSubmitted &&
        Object.keys(formError).length === 0 &&
        result.success
      ) {
        console.log(response);
        // cartCtx.currUser(formValues.email);
        // const authToken = result?.authToken;
        // setAuth(authToken);
        navigate("/");
        window.location.reload();
      }
    };
    if (isSubmitted && Object.keys(formError).length === 0) {
      handleRequest();
    }
  }, [formError, isSubmitted]);

  return (
    <>
      <Head content="Admin Login" path="/adminlogin" />
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
