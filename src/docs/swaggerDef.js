const { version } = require("../../package.json");

const swaggerDef = {
    openapi: "3.0.0",
    info: {
        title: "ManageUsers",
        description: "User Management system using Mongo, Node & Express",
        version,
        author: "Saadullah",
        contact: {
            //name: "Saadullah",
            email: "saadullahmughal4@gmail.com",
        },
    },
    servers: [
        {
            url: `http://localhost:5000/api`,
        },
    ],
};

module.exports = swaggerDef;
