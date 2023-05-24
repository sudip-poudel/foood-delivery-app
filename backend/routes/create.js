const express = require("express");
const MealItem = require("../models/MealItems");
const User = require("../models/User");
const router = express.Router();

router.get("/getitems", async (req, res) => {
	try {
		const data = await MealItem.find({});
		// console.log(data, "these are datas");
		res.json(data);
	} catch (error) {
		console.log(error);
	}
});
router.post("/createuser", async (req, res) => {
	try {
		console.log(req.body);
		const userExist = await User.findOne({ email: req.body.email });
		if (userExist) {
			return res.json({ success: false, exist: true });
		}
		User.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			location: req.body.location,
		});
		res.status(200).json({ success: true });
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false });
	}
});

router.post("/login", async (req, res) => {
	try {
		const data = await User.findOne({ email: req.body.email });
		if (data) {
			if (req.body.password !== data.password) {
				return res.json({ success: false, messege: "Incorrect Password" });
			} else {
				return res.json({ success: true });
			}
		} else {
			console.log(data);
			return res.json({ success: false, messege: "User Doesn't Exists" });
		}
	} catch (error) {
		console.log(error);
		res.send(500).json({ success: false, messege: "Server Error" });
	}
});
module.exports = router;
