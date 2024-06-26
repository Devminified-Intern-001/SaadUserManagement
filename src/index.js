const mongoose = require("mongoose");
const User = require("./dataModel/user.model");
const app = require("./server");
const { verifyConnection } = require("./services/email.service");
require("dotenv").config();

const uri = process.env.MONGO_URI;

console.log("Connecting to MongoDB");

async function start() {
    let initialized = await mongoose
        .connect(uri)
        .then(() => {
            console.log("Successfully connected to MongoDB");
            console.log("Connecting to Gmail");
            return verifyConnection()
                .then((val) => {
                    console.log("Successfully connected to Gmail");
                    return val;
                })
                .catch((error) => {
                    console.error(error);
                    return false;
                });
        })
        .catch((error) => {
            console.log("");
            console.dir(error);
            return false;
        });

    if (initialized)
        app.listen(5000, () => {
            console.log("Server is running");
        });
    else {
        console.error("ERROR: Unable to connected to MongoDB or Gmail");
    }
}

start();
