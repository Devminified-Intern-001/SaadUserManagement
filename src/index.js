const mongoose = require("mongoose");
const User = require("./dataModel/user.model");
const app = require("./server");

const uri =
    "mongodb+srv://saadullah:saad2003@devminified.hiye9xh.mongodb.net/userManagement?retryWrites=true&w=majority&appName=Devminified";

console.log("Connecting to MongoDB");

async function start() {
    let initialized = await mongoose
        .connect(uri)
        .then(() => {
            console.log("Successfully connected to MongoDB");
            return true;
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
        console.error("ERROR: Unable to connected to MongoDB");
    }
}

start();
