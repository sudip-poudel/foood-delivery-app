import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItems from "./MealItem/MealItem";
import { useEffect, useState } from "react";
import axios from "axios";
const AvailableMeals = () => {
  const [mealData, setData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchedData = async () => {
      const data = await fetch(
        `${import.meta.env.VITE_REACT_API_URL}/getitems`,
        {
          method: "GET",
        }
      );
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_API_URL}/getcategory`
      );
      const datas = await data.json();
      const category = response.data;
      setCategories(category);
      setData(datas);
    };
    fetchedData();
  }, []);

  console.log(mealData, "statedata");
  console.log(categories, "categories");
  // console.log(mealsList);
  const getMeal = (mealCategory) => {
    const mealsList = mealData.filter((meal) => meal.category == mealCategory);
    console.log(mealsList, "mealsList");
    const listItem = mealsList.map((meal, i) => (
      <Card key={i}>
        <MealItems
          key={meal.id}
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
    <section className={classes.meals}>
      {categories.map((category) => {
        return (
          <div key={category._id}>
            <h1>{category.categoryName.toUpperCase()}</h1>
            <ul>{getMeal(category.categoryName)}</ul>
          </div>
        );
      })}
      {/* 
      <h1>Fast-Food</h1>
      <ul>{getMeal("Fast-food")}</ul>
      
      <h1>Snacks</h1>
      <ul>{getMeal("Snacks")}</ul>
      <h1>Noodles</h1>
      <ul>{getMeal("noodles")}</ul>
      <h1>Special food</h1>
      <ul>{getMeal("Special food")}</ul>
      <h1>Meal</h1>
      <ul>{getMeal("meal")}</ul>
      <h1>Drink</h1>
      <ul>{getMeal("Drink")}</ul> */}
    </section>
  );
};
export default AvailableMeals;
