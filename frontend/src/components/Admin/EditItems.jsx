import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ItemForm from "./ItemForm";
const EditItems = () => {
  const navigate = useNavigate();
  const [mealData, setData] = useState({});
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const fetchedData = async () => {
      const data = await fetch(
        `${import.meta.env.VITE_REACT_API_URL}/getitems/${id}`,
        {
          method: "GET",
        }
      );
      const datas = await data.json();
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
    const data = await fetch(
      `${import.meta.env.VITE_REACT_API_URL}/edititem/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemData),
      }
    );
    const response = await data.json();
    console.log(response, "this is the data");
    console.log(response.messege);
    if (response.success) {
      alert(`${response.messege}`);
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
