const { token } = require('../config.json');
const jwt = require('jsonwebtoken')
const User = require("../models/User");


const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        jwt.verify(authHeader, token, async (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = await User.findOne({ pseudo: user.username });
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = { verifyToken }