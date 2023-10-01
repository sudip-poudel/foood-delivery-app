import { useState } from "react";
import ItemForm from "./ItemForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AddProducts = () => {
  const navigate = useNavigate();
  const handleSubmit = async (newItem) => {
    console.log(newItem, "dfaklsjdflkjasdlkfjl");
    const itemData = {
      name: newItem.name,
      category: newItem.categoryselect,
      description: newItem.description,
      price: newItem.price,
      img: newItem.img,
    };
    console.log(itemData, "additem.jsx");
    const formData = new FormData();
    formData.append("name", itemData.name);
    formData.append("category", itemData.category);
    formData.append("description", itemData.description);
    formData.append("price", itemData.price);
    formData.append("file", itemData.img);
    // console.log(formData.getAll());

    const data = await axios.post(
      `${import.meta.env.VITE_REACT_API_URL}/additem`,
      formData
    );
    const response = data.data;
    console.log(response);
    if (response.success) {
      alert(`${response.messege}`);
      formData.forEach(function (val, key, fD) {
        formData.delete(key);
      });
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
