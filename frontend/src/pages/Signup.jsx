import React, { useState, useEffect } from "react";
import classes from "./Signup.module.css";
import Button from "../components/UI/Button";
import { Link, useNavigate } from "react-router-dom";
import Head from "./Head";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const initialValues = { name: "", email: "", password: "", address: "" };

  const [formValues, setFormValues] = useState(initialValues);

  const [formError, setFormError] = useState({});

  const [isSubmitted, setIsSubmitted] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validateForm = ({ name, email, password, address }) => {
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
    if (address.length < 5) {
      errorMessage.address = "Enter a valid address";
    }
    if (name.length < 3) {
      errorMessage.name = "Name is too short";
    }
    return errorMessage;
  };
  const signupHandler = (e) => {
    e.preventDefault();
    const errors = validateForm(formValues);
    setFormError(errors);
    setIsSubmitted(true);
    // console.log(formError, "Error");
  };
  useEffect(() => {
    const handleRequest = async () => {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_API_URL}/createuser`,
        {
          name: formValues.name,
          email: formValues.email.toLowerCase(),
          password: formValues.password,
          location: formValues.address,
        },
        {
          withCredentials: true,
        }
      );
      const result = await response.data;
      if (result.exist) {
        return alert("User Already Exist, Please Login");
      }
      if (
        isSubmitted &&
        Object.keys(formError).length === 0 &&
        result.success
      ) {
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
        <form className={classes.container} onSubmit={signupHandler}>
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" name="name" onChange={onChange} />
          <p className={classes.error}>{formError.name}</p>
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
          <label htmlFor="address">Address</label>
          <input type="text" name="address" id="address" onChange={onChange} />
          <p className={classes.error}>{formError.address}</p>
          <Button type="submit">Signup</Button>
          <p>
            Alredy have an account?<Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Signup;
