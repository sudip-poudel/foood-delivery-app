import React from "react";
import classes from "./Page404.module.css";
import Page404Img from "../assets/404.png";
const Page404 = () => {
  return (
    <div className={classes.container}>
      <img className={classes.image} src={Page404Img} alt="404Eoror" />
      <h1 className={classes.heading}>PAGE NOT FOUND!</h1>
    </div>
  );
};

export default Page404;
