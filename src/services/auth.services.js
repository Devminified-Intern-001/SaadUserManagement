const httpStatus = require("http-status");
const mongoose = require("mongoose");
const Admin = require("../dataModel/admin.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 12;
const salt = "$2b$10$BiNGMunNPp0wlFHgZbGCNu";
const tokenSign = "$2b$10$zYcD2iPbhtfPjFjaipKslO";

const signUp = async (reqBody) => {
    if (!reqBody?.fName || !reqBody?.email || !reqBody?.password) {
        return false;
    }
    let record = {
        firstName: reqBody?.fName,
        password: await bcrypt.hash(reqBody?.password, salt),
        email: reqBody?.email,
    };
    if (reqBody?.lName) record["lastName"] = reqBody?.lName;
    return Admin.create(record)
        .then((result) => {
            return true;
        })
        .catch((err) => {
            console.error(err);
            return false;
        });
};

const logIn = async (reqBody) => {
    if (!reqBody?.email || !reqBody?.password) {
        return false;
    }
    let record = {
        password: await bcrypt.hash(reqBody?.password, salt),
        email: reqBody?.email,
    };
    if (reqBody?.lName) record["lastName"] = reqBody?.lName;
    return Admin.findOne(record)
        .then((result) => {
            if (!result) return false;
            let token = "";
            const tokenPayload = {
                ...result["_doc"],
            };
            try {
                token = jwt.sign(tokenPayload, tokenSign);
            } catch (error) {
                console.error(error);
                return false;
            }
            console.log(token);
            return true;
        })
        .catch((err) => {
            console.error(err);
            return false;
        });
};

module.exports = {
    signUp,
    logIn,
};
