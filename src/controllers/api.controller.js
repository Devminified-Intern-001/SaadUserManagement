const httpStatus = require("http-status");
const userService = require("../services/user.services");
const { response } = require("express");

const crateUser = async (req, res) => {
    const query = req?.query;
    const response = await userService.createUser(query);
    if (response) {
        res.status(httpStatus.CREATED).send({
            status: "OK",
            user: query?.user,
        });
    } else {
        res.status(httpStatus.EXPECTATION_FAILED).send({
            status: "Failed",
            user: query?.user,
        });
    }
};

const getUsers = async (req, res) => {
    const userList = await userService.serviceGetUsers(req.query);
    const responseStatus = userList?.status;
    if (responseStatus == "OK") {
        res.status(200).send(userList);
    } else {
        res.status(httpStatus.EXPECTATION_FAILED).send({ status: "Failed" });
    }
};

const delUsers = async (req, res) => {
    const query = req?.query;
    const response = await userService.serviceDelUsers(query);
    if (response) {
        res.status(httpStatus.OK).send({
            status: "OK",
            user: query?.user,
        });
    } else {
        res.status(httpStatus.EXPECTATION_FAILED).send({
            status: "Failed",
            user: query?.user,
        });
    }
};

const updateUser = async (req, res) => {
    const query = req?.query;
    const response = userService.serviceUpdateUsers(query);
    if (response) {
        res.status(httpStatus.OK).send({
            status: "OK",
            user: query?.user,
            age: query?.age,
        });
    } else {
        res.status(httpStatus.EXPECTATION_FAILED).send({
            status: "Failed",
            user: query?.user,
            age: query?.age,
        });
    }
};

const retireUser = async (req, res) => {
    const query = req?.query;
    const response = await userService.serviceRetireUser(query);
    if (response) {
        res.status(httpStatus.OK).send({
            status: "OK",
            user: query?.user,
            age: 60,
        });
    } else {
        res.status(httpStatus.EXPECTATION_FAILED).send({
            status: "Failed",
            user: query?.user,
        });
    }
};

module.exports = {
    crateUser,
    getUsers,
    delUsers,
    updateUser,
    retireUser,
};
