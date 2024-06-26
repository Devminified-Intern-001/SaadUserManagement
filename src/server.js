const express = require("express");
const routes = require("./routes");
const httpStatus = require("http-status");
const cookie_parser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookie_parser());
app.use(routes);

app.use((req, res) => {
    res.status(httpStatus.NOT_FOUND).send("Not Found");
});

module.exports = app;
