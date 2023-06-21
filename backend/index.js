const express = require("express");
const app = express();
// const cors = require("cors");
const mongoDB = require("./db");
const port = 5000;
mongoDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use((req, res, next) => {
// 	res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
// 	res.header(
// 		"Access-Control-Allow-Headers",
// 		"Origin, X-Requested-With, Content-Type, Accept"
// 	);
// 	next();
// });
// app.use(cors());
const cors = require("cors");
app.use(
	cors({
		origin: ["http://localhost:5173", "https://reactmeals-ujly.onrender.com"],
	})
);

app.get("/", (req, res) => {
	res.send("Jelli world");
});
app.use("/api", require("./routes/create"));

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
