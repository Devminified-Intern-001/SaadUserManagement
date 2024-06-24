const express = require("express");
const apiRoutes = require("./api.route");
const docsRoute = require("./docs.route");

let router = express.Router();

const defaultRoutes = [{ path: "/api", route: apiRoutes }];
const devRoutes = [{ path: "/", route: docsRoute }];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

devRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
