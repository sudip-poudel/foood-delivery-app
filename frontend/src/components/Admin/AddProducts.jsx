import React from "react";
import ItemForm from "./ItemForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AddProducts = () => {
  const navigate = useNavigate();
  const handleSubmit = async (newItem) => {
    const itemData = {
      name: newItem.name,
      category: newItem.categoryselect,
      description: newItem.description,
      price: newItem.price,
      img: newItem.img,
    };
    const img = itemData.img;
    const data = await axios.post(
      `${import.meta.env.VITE_REACT_API_URL}/additem`,
      {
        itemData,
        // method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        // body: JSON.stringify(itemData),
      }
    );
    const response = await data.json();
    if (response.success) {
      alert(`${response.messege}`);
      navigate("/admin/manageproducts");
    } else {
      alert(`${response.messege}`);
    }
  };

  return (
    <div>
      <ItemForm onSubmitForm={handleSubmit} />
    </div>
  );
};

export default AddProducts;
