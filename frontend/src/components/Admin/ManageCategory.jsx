import React, { useState, useEffect } from "react";
import classes from "./ManageCategory.module.css";
const ManageCatagory = () => {
  // State to hold the list of categories
  const [catagories, setCatagories] = useState([]);
  // State to hold the value of the input field
  const [newCatagory, setNewCatagory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_API_URL}/getCatagory`
      );
      const result = await response.json();
      setCatagories(result);
    };
    fetchCategories();
  }, [catagories]);

  const handleAddCatagory = async () => {
    if (newCatagory.trim() !== "") {
      const data = await fetch(
        `${import.meta.env.VITE_REACT_API_URL}/addcatagory`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ catagoryName: newCatagory }),
        }
      );
      const response = await data.json();
      if (!response.success) {
        return alert(response.messege);
      } else {
        setCatagories([...catagories, newCatagory]);
        setNewCatagory("");
      }
    }
  };

  const handleDeleteCatagory = async (id) => {
    const data = await fetch(
      `${import.meta.env.VITE_REACT_API_URL}/deletecatagory/${id}`,
      {
        method: "get",
      }
    );
    const response = await data.json();
    if (!response.success) {
      return alert(response.messege);
    } else {
      const updatedCategories = catagories.filter((_, _id) => _id !== id);
      setCatagories(updatedCategories);
      alert(response.messege);
    }
  };

  return (
    <div className={classes.category_manager}>
      <h2>Categories</h2>
      <ul className={classes.category_list}>
        {catagories.map((category, index) => (
          <li key={index} className={classes.category_item}>
            {category.catagoryName}
            <button
              className={classes.delete_button}
              onClick={() => handleDeleteCatagory(category._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div className={classes.add_category}>
        <input
          type="text"
          className={classes.category_input}
          value={newCatagory}
          onChange={(e) => setNewCatagory(e.target.value)}
        />
        <button className={classes.add_button} onClick={handleAddCatagory}>
          Add Category
        </button>
      </div>
    </div>
  );
};

export default ManageCatagory;
