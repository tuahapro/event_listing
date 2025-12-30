require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

const checkDB = async () => {
    const MONGODB_URI =
        process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/event_listing";

    console.log("-----------------------------------------");
    console.log("Checking Database Connection...");
    console.log("URI:", MONGODB_URI.replace(/:[^:]*@/, ":****@")); // Hide password

    try {
        const conn = await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log("✅ Connected successfully!");
        console.log("Effective DB Name:", conn.connection.name);
        console.log("Host:", conn.connection.host);
        console.log("-----------------------------------------");

        console.log("Checking 'users' collection...");
        const userCount = await User.countDocuments();
        console.log(`Query: User.countDocuments()`);
        console.log(`Result: ${userCount} users found.`);

        if (userCount > 0) {
            const users = await User.find({}).limit(5).select("email name isVerified createdAt");
            console.log("Latest 5 users:");
            console.table(users.map(u => ({
                id: u._id.toString(),
                name: u.name,
                email: u.email,
                verified: u.isVerified,
                created: u.createdAt
            })));
        } else {
            console.log("⚠️ No users found in this database.");
            console.log("Suggestion: Are you looking at the right 'Database Name' in Atlas?");
        }

        console.log("-----------------------------------------");
        process.exit(0);
    } catch (err) {
        console.error("❌ Connection Failed:", err.message);
        process.exit(1);
    }
};

checkDB();
