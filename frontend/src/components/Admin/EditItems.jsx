import React, { useEffect, useState } from "react";

const EditItems = () => {
	const [mealData, setData] = useState([]);

	useEffect(() => {
		const fetchedData = async () => {
			const data = await fetch("http://localhost:5000/api/getitems", {
				method: "GET",
			});
			const datas = await data.json();
			setData(datas);
		};
		fetchedData();
	}, []);
	const mealItems = mealData.map(<li>{mealItems}</li>);
	return <div>EditItems</div>;
};

export default EditItems;
