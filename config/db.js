const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.ATLAS_URI;

const connectDB = async () => {
    try {
        const connection = mongoose.connection;
        mongoose.connect(uri);

        connection.once('open', () => {
            console.log("Database is up");
        });
        }catch (error) {
            console.log("MongoDB connection error :", error.mesage);
    }};

module.exports = { connectDB };
