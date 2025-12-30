require("dotenv").config();
const mongoose = require("mongoose");

const testConnection = async () => {
    const MONGODB_URI =
        process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/event_listing";

    console.log("Testing Connection with dbName: 'event_listing'...");

    try {
        // This EXACTLY matches the code now in server.js
        const conn = await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            dbName: "event_listing",
        });

        console.log("✅ PROOF OF CONNECTION:");
        console.log(`   Connected to Host: ${conn.connection.host}`);
        console.log(`   Active Database Name: '${conn.connection.name}'`);

        if (conn.connection.name === 'event_listing') {
            console.log("SUCCESS: Data will be saved to 'event_listing' database.");
        } else {
            console.log("FAILURE: Data is still going to wrong database.");
        }

        process.exit(0);
    } catch (err) {
        console.error("Connection Failed:", err.message);
        process.exit(1);
    }
};

testConnection();
