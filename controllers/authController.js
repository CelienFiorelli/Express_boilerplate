const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { token } = require('../config.json');
const express = require('express');
const { verifyParams } = require("../middleware/verifyParams");

const db = require("../models");
const Users = db.users;

const router = express.Router();


router.post('/register', verifyParams(["username", "password"]), async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        
        const user = await Users.create({
            username: req.body.username,
            password: hash,
        })

        const accessToken = jwt.sign({ userId: user.id}, token);
        return res.send({ token: accessToken })
        
    } catch (error) {
        return res.status(409).send({ message: `${req.body.username} already exists`});
    }
})

router.post('/login', verifyParams(["username", "password"]), async (req, res) => {
    try {
        const user = await Users.findOne({where: { username: req.body.username }})
        
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(403).send({ message: "invalid credentials"})
        }

        const accessToken = jwt.sign({ username: user.username,  role: user.role }, token);
        return res.send({ token: accessToken })
    } catch (error) {
        return res.status(404).send({
            message: "user doesnt exist"
        });
    }
})


module.exports = router;

