import React, { useRef, useState } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";

function MealItemForm(props) {
  const { auth } = useAuth();

  const navigate = useNavigate();
  const [amountIsValid, setAmountIsValid] = useState(true);
  const enteredAmountRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    if (!auth.user) {
      alert("Please login first");
      navigate("/login");
      return;
    }
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
