const express = require("express");
const {
    signUp,
    logIn,
    logOut,
    forgotPassword,
    resetPassword,
} = require("../controllers/auth.controller");
const { auth } = require("../middlewares/auth");

const router = express.Router();

router.post("/signUp", signUp);

router.post("/logIn", logIn);

router.post("/logOut", auth, logOut);

router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);

module.exports = router;
