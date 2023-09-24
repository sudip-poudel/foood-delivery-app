import React from "react";
import classes from "./LeftPanel.module.css";
import { Link } from "react-router-dom";
const LeftPanel = () => {
  return (
    <div className={classes.container}>
      <Link to={"order"}>Order</Link>
      <Link to={"manageproducts"}>Manage Products</Link>
      <Link to={"addproducts"}>Add Products</Link>
    </div>
  );
};

export default LeftPanel;
