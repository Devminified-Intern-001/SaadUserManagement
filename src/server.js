const express = require("express");
const routes = require("./routes");
const httpStatus = require("http-status");

const app = express();

app.use(express.json());
app.use(routes);

app.use((req, res) => {
    res.status(httpStatus.NOT_FOUND).send("Not Found");
});

module.exports = app;
