import React, { useEffect, useState } from "react";
import classes from "./ItemForm.module.css";
import { useNavigate } from "react-router-dom";
const ItemForm = (props) => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_API_URL}/getCatagory`
      );
      const result = await response.json();
      setCategories(result);
    };
    fetchCategories();
  }, []);
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
  const handleCancel = () => {
    navigate("/admin/manageproducts");
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
          {categories.map((category, index) => (
            <option key={index} value={category.catagoryName}>
              {category.catagoryName}
            </option>
          ))}
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
        <div className={classes.buttons}>
          <input type="submit" value="Submit" />
          <input type="button" onClick={handleCancel} value={"Cancel"} />
        </div>
      </form>
    </div>
    // css for above form to make it look good
  );
};

export default ItemForm;
