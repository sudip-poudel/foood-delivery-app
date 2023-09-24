import React from "react";
import Button from "../components/UI/Button";
import { Link } from "react-router-dom";
import classes from "./Head.module.css";
const Head = (props) => {
  return (
    <div className={classes.header}>
      <h1>
        <Link style={{ textDecoration: "none", color: "white" }} to="/">
          ReactMeals
        </Link>
      </h1>

      <Link to={props.path}>
        <Button type="button">{props.content}</Button>
      </Link>
    </div>
  );
};
export default Head;
