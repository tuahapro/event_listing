require("dotenv").config();
const nodemailer = require("nodemailer");

const testEmail = async () => {
    console.log("Testing Email Configuration...");
    console.log("User:", process.env.EMAIL_USER ? "Set" : "Not Set");
    console.log("Pass:", process.env.EMAIL_PASSWORD ? "Set" : "Not Set");

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
        console.error("Missing EMAIL_USER or EMAIL_PASSWORD in .env");
        return;
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    try {
        console.log("Verifying transporter connection...");
        await transporter.verify();
        console.log("Transporter verification successful!");

        console.log("Sending test email...");
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Send to self
            subject: "Test Email from EventListing Debugger",
            text: "If you see this, email sending is working!",
        });
        console.log("Test email sent successfully!");
    } catch (error) {
        console.error("Email Test Failed:", error);
    }
};

testEmail();
