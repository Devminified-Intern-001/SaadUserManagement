const httpStatus = require("http-status");
const authServices = require("../services/auth.service");
const { response } = require("express");

const signUp = async (req, res) => {
    const query = req?.query;
    const response = await authServices.signUp(query);
    if (response) {
        res.status(httpStatus.CREATED).send({
            status: "OK",
            user: query?.email,
        });
    } else {
        res.status(httpStatus.EXPECTATION_FAILED).send({
            status: "Failed",
            user: query?.email,
        });
    }
};

const logIn = async (req, res) => {
    const query = req?.query;
    const response = await authServices.logIn(query);
    if (response != false) {
        res.cookie("ui", response);
        res.status(httpStatus.OK).send({
            status: "OK",
            email: query?.email,
            password: query?.password,
        });
    } else {
        res.status(httpStatus.EXPECTATION_FAILED).send({
            status: "Failed",
            email: query?.email,
            password: query?.password,
        });
    }
};

const logOut = async (req, res) => {
    try {
        res.cookie("ui", null);
        res.status(httpStatus.OK).send("Logged-Out");
    } catch (error) {
        res.status(httpStatus.EXPECTATION_FAILED).send("Failed");
    }
};

const forgotPassword = async (req, res) => {
    const query = req?.query;
    //if (!query) return false;
    //console.log("Controller");
    const response = await authServices.forgotPassword(query);
    if (response) {
        res.status(httpStatus.CREATED).send("Mail with reset token sent.");
    } else {
        res.status(httpStatus.EXPECTATION_FAILED).send("Something went wrong");
    }
};

const resetPassword = async (req, res) => {
    const query = req?.query;
    //if (!query) return false;
    console.log("Controller");
    const response = await authServices.resetPassword(query);
    if (response) {
        res.status(httpStatus.CREATED).send("Password reset.");
    } else {
        res.status(httpStatus.EXPECTATION_FAILED).send("Something went wrong");
    }
};

module.exports = {
    signUp,
    logIn,
    logOut,
    forgotPassword,
    resetPassword,
};
