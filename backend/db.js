const mongoose = require("mongoose");
const uri =
	"mongodb+srv://reactmeals:root@cluster0.mcnxmvw.mongodb.net/reactmeals?retryWrites=true&w=majority"; //reactmeals
// "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.9.0";

const mongoDB = async () => {
	try {
		await mongoose.connect(uri, { useNewUrlParser: true });
		console.log("Connected sucessfully!");
	} catch (error) {
		console.log(error);
	}
};

module.exports = mongoDB;
