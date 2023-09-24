import React from "react";
import { useEffect, useState } from "react";
import Card from "../UI/Card";
// import MealItems from "../Meals/MealItem/MealItem";
import classes from "./Products.module.css";
import ProductsCard from "./ProductsCard";

const ManageProducts = () => {
  const [mealData, setData] = useState([]);

  useEffect(() => {
    const fetchedData = async () => {
      const data = await fetch(
        `${import.meta.env.VITE_REACT_API_URL}/getitems`,
        {
          method: "GET",
        }
      );
      const datas = await data.json();
      setData(datas);
    };
    fetchedData();
  }, []);

  console.log(mealData[1], "statedata");
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
