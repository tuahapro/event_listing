const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/event_listing";

const deleteUser = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    const email = "mohammadtuaha63@gmail.com";
    const result = await User.deleteOne({ email });

    if (result.deletedCount === 0) {
      console.log(`User with email ${email} not found.`);
    } else {
      console.log(`User with email ${email} deleted successfully.`);
    }

    mongoose.connection.close();
  } catch (err) {
    console.error("Error deleting user:", err);
    process.exit(1);
  }
};

deleteUser();
