const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;
