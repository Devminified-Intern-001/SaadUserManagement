const httpStatus = require("http-status");
const authServices = require("../services/auth.services");
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
    if (response) {
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

module.exports = {
    signUp,
    logIn,
};
