import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItems from "./MealItem/MealItem";
import { useEffect, useState } from "react";
// const DUMMY_MEALS = [
// 	{
// 		id: "m1",
// 		name: "Sushi",
// 		description: "Finest fish and veggies",
// 		price: 22.99,
// 		img: "https://source.unsplash.com/featured/300x203",
// 	},
// 	{
// 		id: "m2",
// 		name: "Schnitzel",
// 		description: "A german specialty!",
// 		price: 16.5,
// 		img: "https://source.unsplash.com/featured/300x203",
// 	},
// 	{
// 		id: "m3",
// 		name: "Barbecue Burger",
// 		description: "American, raw, meaty",
// 		price: 12.99,
// 		img: "https://source.unsplash.com/featured/300x203",
// 	},
// 	{
// 		id: "m4",
// 		name: "Green Bowl",
// 		description: "Healthy...and green...",
// 		price: 18.99,
// 		img: "https://source.unsplash.com/featured/300x203",
// 	},
// ];
const AvailableMeals = () => {
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

  console.log(mealData, "statedata");
  // console.log(mealsList);
  const getMeal = (mealCategory) => {
    const mealsList = mealData.filter((meal) => meal.catagory === mealCategory);

    const listItem = mealsList.map((meal, i) => (
      <Card key={i}>
        <MealItems
          key={meal.id}
          id={meal.id}
          name={meal.name}
          description={meal.description}
          price={meal.price}
          img={meal.img}
        />
      </Card>
    ));
    return listItem;
  };
  // console.log(mealsList);
  // const pizza = mealsList.filter((meal) => meal.category === "pizza");
  return (
    <section className={classes.meals}>
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
      <ul>{getMeal("Drink")}</ul>
    </section>
  );
};
export default AvailableMeals;
