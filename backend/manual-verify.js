require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

const verifyUser = async () => {
    const MONGODB_URI =
        process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/event_listing";

    const emailToVerify = "mohammadtuaha63@gmail.com"; // Found in check-db.js

    try {
        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log("Connected to DB.");

        const user = await User.findOne({ email: emailToVerify });

        if (!user) {
            console.log(`❌ User ${emailToVerify} not found.`);
        } else {
            console.log(`Found user: ${user.name}`);
            console.log(`Current Status: ${user.isVerified ? "Verified" : "Unverified"}`);

            if (!user.isVerified) {
                user.isVerified = true;
                user.verificationOTP = undefined; // Clear OTP
                await user.save();
                console.log("✅ User successfully verified!");
            } else {
                console.log("User is already verified.");
            }
        }

        process.exit(0);
    } catch (err) {
        console.error("Error:", err.message);
        process.exit(1);
    }
};

verifyUser();
