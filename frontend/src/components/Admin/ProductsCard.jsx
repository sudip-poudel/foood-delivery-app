import { React } from "react";
import classes from "./ProductsCard.module.css";
import Button from "../UI/Button";
import { Link } from "react-router-dom";

const ProductsCard = (props) => {
  // const price = `Rs ${props.price.toFixed(2)}`;

  const price = `Rs ${props.price}`;

  const deleteHandler = async () => {
    const id = props.id;
    const verify = window.confirm("Are you sure you want to delete?");
    if (!verify) {
      return;
    } else {
      const data = await fetch(
        `${import.meta.env.VITE_REACT_API_URL}/deleteproduct`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );
      const response = await data.json();
      if (response.success) {
        alert(`${response.messege}`);
        window.location.reload();
      } else {
        alert(`${response.messege}`);
      }
    }
  };
  return (
    <li className={classes.meal}>
      <div>
        <h3 className={classes.name}>{props.name}</h3>

        <img
          src={`${import.meta.env.VITE_REACT_API_IMG_URL}/images/${props.img}`}
          height={200}
          width={300}
          alt="image"
        />
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div className={classes.btngrp}>
        <Link to={"/admin/editproduct/" + props.id}>
          <Button type="button">Edit</Button>
        </Link>
        <Button type="button" onClick={deleteHandler}>
          Delete
        </Button>
      </div>
    </li>
  );
};

export default ProductsCard;
