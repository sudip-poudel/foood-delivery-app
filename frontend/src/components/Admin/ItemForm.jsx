import React, { useEffect, useState } from "react";
import classes from "./ItemForm.module.css";
import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";
const ItemForm = (props) => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [newItem, setNewItem] = useState({});
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
  useEffect(() => {
    if (props.item !== undefined) setNewItem(props.item);
    else {
      setNewItem({
        name: "",
        categoryselect: "",
        description: "",
        price: "",
        img: "",
      });
    }
  }, [props.item]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newItem, "this is inside itemform");
    const items = newItem;
    props.onSubmitForm(items);
  };

  const handleCancel = () => {
    navigate("/admin/manageproducts");
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name !== "img") {
      setNewItem({ ...newItem, [name]: value });
    } else {
      //hereeeeee
      const image = e.target.files[0];
      console.log(e.target.files[0]);
      console.log("testdjfliasdh");
      setNewItem({ ...newItem, img: image });
    }
  };
  useEffect(() => {
    // console.log(newItem);
  }, [newItem]);
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
          {props.item !== undefined ? (
            <option value={""} disabled selected>
              Select Category
            </option>
          ) : (
            <option value={""} disabled>
              Select Category
            </option>
          )}
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
        <label htmlFor="image">Image :</label>
        <input
          type="file"
          id="image"
          onChange={onChange}
          accept=".jpg , .jpeg , .png"
          name="img"
          // value={newItem.img}
          required
        />
        <div className={classes.buttons}>
          <Button type="submit" value="Submit">
            Submit
          </Button>
          <Button type="button" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ItemForm;
