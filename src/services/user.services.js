const httpStatus = require("http-status");
const User = require("../dataModel/user.model");

const createUser = async (reqBody) => {
    return User.create(reqBody.user, parseInt(reqBody.age)).then((result) => {
        return result;
    });
};

const serviceGetUsers = async (reqBody) => {
    let userList = await User.get(reqBody?.user, reqBody?.age);
    if (userList) {
        // userList.map((element) => {
        //     let el = element;
        //     delete element["_id"];
        //     return el;
        // });
        return { status: "OK", users: userList };
    }
    return { status: "Failed" };
};

const serviceDelUsers = (reqBody) => {
    return User.del(reqBody?.user);
};

const serviceUpdateUsers = (reqBody) => {
    const name = reqBody?.user;
    const age = reqBody?.age;
    return User.update(name, age);
};

const serviceRetireUser = (reqBody) => {
    const name = reqBody?.user;
    return User.retire(name);
};

module.exports = {
    createUser,
    serviceGetUsers,
    serviceDelUsers,
    serviceUpdateUsers,
    serviceRetireUser,
};
