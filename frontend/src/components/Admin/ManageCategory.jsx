import React, { useState, useEffect } from "react";
import classes from "./ManageCategory.module.css";
const Managecategory = () => {
  // State to hold the list of categories
  const [catagories, setCatagories] = useState([]);
  // State to hold the value of the input field
  const [newcategory, setNewcategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_API_URL}/getcategory`
      );
      const result = await response.json();
      setCatagories(result);
    };
    fetchCategories();
  }, [catagories]);

  const handleAddcategory = async () => {
    if (newcategory.trim() !== "") {
      const data = await fetch(
        `${import.meta.env.VITE_REACT_API_URL}/addcategory`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ categoryName: newcategory }),
        }
      );
      const response = await data.json();
      if (!response.success) {
        return alert(response.messege);
      } else {
        setCatagories([...catagories, newcategory]);
        setNewcategory("");
      }
    }
  };

  const handleDeletecategory = async (id) => {
    const data = await fetch(
      `${import.meta.env.VITE_REACT_API_URL}/deletecategory/${id}`,
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
            {category.categoryName}
            <button
              className={classes.delete_button}
              onClick={() => handleDeletecategory(category._id)}
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
          value={newcategory}
          onChange={(e) => setNewcategory(e.target.value)}
        />
        <button className={classes.add_button} onClick={handleAddcategory}>
          Add Category
        </button>
      </div>
    </div>
  );
};

export default Managecategory;
