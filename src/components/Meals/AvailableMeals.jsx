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
			const data = await fetch("http://localhost:5000/api/getitems", {
				method: "GET",
			});
			const datas = await data.json();
			console.log(datas);
			setData(datas);
		};
		fetchedData();
	}, []);

	console.log(mealData.length, "statedata");
	const mealsList = mealData.map((meal) => (
		<MealItems
			key={meal.id}
			id={meal.id}
			name={meal.name}
			description={meal.description}
			price={meal.price}
			img={meal.img}
		/>
	));
	return (
		<section className={classes.meals}>
			<Card>
				<ul>{mealsList}</ul>
			</Card>
		</section>
	);
};
export default AvailableMeals;
