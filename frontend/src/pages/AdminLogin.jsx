import React, { useEffect, useState } from "react";
import classes from "./Login.module.css";
import Button from "../components/UI/Button";
import { useNavigate } from "react-router-dom";
import Head from "./Head";
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
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_API_URL}/adminlogin`,
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
        navigate("/admin/order");
        window.location.reload();
      } else {
        isSubmitted(false);
      }
    };
    if (isSubmitted && Object.keys(formError).length === 0) {
      handleRequest();
    }
  }, [formError, isSubmitted]);

  console.log(formError, "FRMERR22");
  return (
    <>
      <Head content="Customer Login" path="/login" />
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
            <Button type="submit">Login as Admin</Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
