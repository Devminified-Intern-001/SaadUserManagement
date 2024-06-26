const httpStatus = require("http-status");
const mongoose = require("mongoose");
const User = require("../dataModel/user.model");

const createUser = async (reqBody) => {
    return User.create({
        name: reqBody.user,
        age: parseInt(reqBody.age),
        retired: parseInt(reqBody.age) < 60 ? false : true,
    })
        .then((result) => {
            return true;
        })
        .catch((err) => {
            console.error(err);
            return false;
        });
};

const serviceGetUsers = async (reqBody) => {
    let query = {};
    if (reqBody?.user) query["name"] = reqBody?.user;
    if (reqBody?.age) query["age"] = reqBody?.age;

    return User.find(query)
        .then((userList) => {
            let outputList = userList.map((element) => {
                return {
                    name: element?.name,
                    age: element?.age,
                    retired: element?.retired,
                };
            });
            return { status: "OK", users: outputList };
        })
        .catch((err) => {
            console.error(err);
            return { status: "Failed" };
        });
};

const serviceDelUsers = (reqBody) => {
    return User.findOneAndDelete({ name: reqBody?.user })
        .then((result) => {
            if (!result) return false;
            return true;
        })
        .catch((err) => {
            console.error(err);
            return false;
        });
};

const serviceUpdateUsers = (reqBody) => {
    const name = reqBody?.user;
    const age = reqBody?.age;
    return User.findOneAndUpdate(
        { name: reqBody?.user },
        {
            $set: {
                age: reqBody?.age,
                retired: parseInt(reqBody?.age) < 60 ? false : true,
            },
        }
    )
        .then((result) => {
            if (!result) return false;
            return true;
        })
        .catch((err) => {
            console.error(err);
            return false;
        });
};

const serviceRetireUser = (reqBody) => {
    const name = reqBody?.user;
    return User.findOneAndUpdate(
        { name: reqBody?.user },
        {
            $set: {
                age: 60,
                retired: true,
            },
        }
    )
        .then((result) => {
            if (!result) return false;
            return true;
        })
        .catch((err) => {
            console.error(err);
            return false;
        });
};

module.exports = {
    createUser,
    serviceGetUsers,
    serviceDelUsers,
    serviceUpdateUsers,
    serviceRetireUser,
};
