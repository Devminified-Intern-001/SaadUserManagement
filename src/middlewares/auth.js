const express = require("express");
const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../utils/token");

const auth = function (req, res, next) {
    const token = req?.cookies?.["ui"];
    if (!token) {
        res.status(httpStatus.UNAUTHORIZED).send("Unauthorized");
        return;
    }
    // console.log(token);
    const authorized = verifyToken(token);
    if (authorized) return next();
    res.status(httpStatus.UNAUTHORIZED).send("Unauthorized");
};

module.exports = { auth };
