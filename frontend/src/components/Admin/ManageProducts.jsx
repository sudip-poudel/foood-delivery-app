import React from "react";
import { useEffect, useState } from "react";
import Card from "../UI/Card";
// import MealItems from "../Meals/MealItem/MealItem";
import classes from "./Products.module.css";
import ProductsCard from "./ProductsCard";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
const ManageProducts = () => {
  const [mealData, setData] = useState([]);
  const { auth } = useAuth();

  useEffect(() => {
    const fetchedData = async () => {
      const data = await axios.get(
        `${import.meta.env.VITE_REACT_API_URL}/getitems`,
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

  // console.log(mealsList);
  const getProducts = () => {
    // const mealsList = mealData.filter((meal) => meal.category === mealCategory);

    const listItem = mealData.map((meal, i) => (
      <Card key={i}>
        <ProductsCard
          key={meal._id}
          id={meal._id}
          name={meal.name}
          description={meal.description}
          price={meal.price}
          img={meal.img}
        />
      </Card>
    ));
    return listItem;
  };
  return (
    <div className={classes.test} style={{ marginLeft: "20%" }}>
      {getProducts()}
    </div>
  );
};

export default ManageProducts;
