const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        age: { type: Number, required: true },
        retired: { type: Boolean, required: true },
    },
    { timestamps: true }
);

/**
 * @typedef User
 */
const User = new mongoose.model("users", userSchema);

module.exports = User;
