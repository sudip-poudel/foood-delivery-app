import React, { useEffect, useState } from "react";
import classes from "./ItemForm.module.css";
const ItemForm = (props) => {
  const initialItemValue = props.item
    ? props.item
    : {
        name: "",
        categoryselect: "",
        description: "",
        price: "",
        img: "",
      };
  console.log(initialItemValue);
  const [newItem, setNewItem] = useState(initialItemValue);
  useEffect(() => {
    setNewItem(initialItemValue);
  }, []);
  console.log(props.item);
  console.log(newItem);
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmitForm(newItem);
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };
  return (
    <div>
      <h1>Add Product</h1>
      <form className={classes.form3} onSubmit={handleSubmit}>
        <label htmlFor="name">Item Name:</label>
        <input
          type="text"
          id="name"
          required
          onChange={onChange}
          name="name"
          value={newItem.name}
        />
        <label htmlFor="categoryselect">Select Category:</label>
        <select
          name="categoryselect"
          id="categoryselect"
          value={newItem.categoryselect}
          onChange={onChange}
        >
          <option value="pizza">Pizza</option>
          <option value="noodels">Noodels</option>
          <option value="momo">Momo</option>
        </select>
        <label htmlFor="description">Description:</label>
        <textarea
          type="textbox"
          id="description"
          onChange={onChange}
          name="description"
          value={newItem.description}
          required
        />
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          onChange={onChange}
          name="price"
          value={newItem.price}
          required
        />
        <label htmlFor="img">Image Link:</label>
        <input
          type="text"
          id="img"
          onChange={onChange}
          name="img"
          value={newItem.img}
          required
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default ItemForm;
