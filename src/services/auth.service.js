const httpStatus = require("http-status");
const mongoose = require("mongoose");
const Admin = require("../dataModel/admin.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { genToken, verifyToken } = require("../utils/token");
const { sendResetLink } = require("./email.service");

const saltRounds = 12;
const salt = process.env.BCRYPT_SALT;

const adminExists = async (email) => {
    let r = await Admin.findOne({ email: email });
    return r != null;
};

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
            token = genToken(tokenPayload);
            // console.log(token);
            return token;
        })
        .catch((err) => {
            console.error(err);
            return false;
        });
};

const forgotPassword = async (reqBody) => {
    const email = reqBody?.email;
    //console.log(reqBody);
    if (!email) return false;
    let exists = await adminExists(email);
    //console.log(email, exists);
    if (!exists) return false;
    else
        return sendResetLink(email)
            .then((result) => {
                return result;
            })
            .catch((error) => {
                return false;
            });
};

const resetPassword = async (reqBody) => {
    if (!reqBody?.token && !reqBody?.password) return false;
    const token = reqBody?.token;
    if (!verifyToken(token)) return false;
    const payload = jwt.decode(token);
    console.log(payload);
    const passHash = await bcrypt.hashSync(reqBody?.password, salt);
    console.log(passHash);
    return Admin.findOneAndUpdate(
        { email: payload?.id },
        { $set: { password: passHash } }
    )
        .then((value) => {
            return true;
        })
        .catch((error) => {
            console.error(error);
            return false;
        });
};

module.exports = {
    signUp,
    logIn,
    forgotPassword,
    resetPassword,
};
