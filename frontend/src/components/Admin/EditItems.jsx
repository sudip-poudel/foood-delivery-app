import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ItemForm from "./ItemForm";
import useAuth from "../../../hooks/useAuth";
const EditItems = () => {
  const navigate = useNavigate();
  const [mealData, setData] = useState({});
  const { id } = useParams();
  const { auth } = useAuth();
  console.log(id);
  useEffect(() => {
    const fetchedData = async () => {
      const data = await axios.get(
        `${import.meta.env.VITE_REACT_API_URL}/getitems/${id}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.authToken}`,
          },
        }
      );
      const datas = await data.data;
      setData(datas);
    };
    fetchedData();
  }, []);
  const handleSubmit = async (newItem) => {
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
    console.log(formData.get("file"));

    const data = await axios.post(
      `${import.meta.env.VITE_REACT_API_URL}/edititem/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${auth?.authToken}`,
        },
      }
    );
    const response = data.data;
    console.log(response);
    if (response.success) {
      alert(`${response.messege}`);
      formData.forEach(function (val, key, _) {
        formData.delete(key);
      });
      navigate("/admin/manageproducts");
    } else {
      alert(`${response.messege}`);
    }
  };
  const exitingItem = {
    name: mealData.name,
    categoryselect: mealData.category,
    description: mealData.description,
    price: mealData.price,
    img: mealData.img,
  };
  console.log(exitingItem);
  return <ItemForm item={exitingItem} onSubmitForm={handleSubmit} />;
};

export default EditItems;
