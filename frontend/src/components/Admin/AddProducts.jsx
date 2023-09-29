import React from "react";
import ItemForm from "./ItemForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AddProducts = () => {
  const navigate = useNavigate();
  const handleSubmit = async (newItem) => {
    const formData = new FormData();
    formData.append("name", newItem.name);
    formData.append("category", newItem.categoryselect);
    formData.append("description", newItem.description);
    formData.append("price", newItem.price);
    formData.append("file", newItem.img);
    const img = itemData.img;
    const data = await axios.post(`http://localhost:5000/api/additem`, {
      formData,
      // method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      // body: JSON.stringify(itemData),
    });
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
