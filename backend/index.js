const express = require("express");
const app = express();
// const cors = require("cors");
const mongoDB = require("./db");
const port = 5000;
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
mongoDB();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static("public"));
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
const Orders = require("./models/Orders");
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", "https://reactmeals-ujly.onrender.com"],
  })
);

app.get("/", (req, res) => {
  res.send("Jelli world");
});
app.use("/api", require("./routes/create"));
app.use(require("./routes/filerouter"));

app.listen(port, () => {
  console.log(` Listening on port ${port}`);
});
