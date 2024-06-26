const jwt = require("jsonwebtoken");

const tokenSign = process.env?.JWT_TOKEN_SIGNATURE;

const genToken = function (payload) {
    try {
        return jwt.sign(payload, tokenSign);
    } catch (error) {
        console.log(error);
        return null;
    }
};

const verifyToken = function (token) {
    try {
        let payload = jwt.verify(token, tokenSign);
        if (!payload) return false;
        const expires = payload?.expires;
        if (!expires) return true;
        const now = Date.now();
        if (expires < now) return false;
        return true;
    } catch (error) {
        return false;
    }
};

module.exports = { genToken, verifyToken };
