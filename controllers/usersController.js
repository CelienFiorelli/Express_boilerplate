const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { token } = require('../config.json');

module.exports = {
    model: User,
    endpoints: [
        {
            method: "get",
            endpoint: "/users",
            middleware: [],
            params: [],
            /**
             * 
             * @param {import("express").Request} req 
             * @param {import("express").Response} res 
             * @returns 
             */
            process: async (req, res) => {
                const users = await User.find()
                return res.status(200).send(users)
            }
        },
        {
            method: "get",
            endpoint: "/user/:id([0-9]+)",
            middleware: [],
            params: [],
            /**
             * 
             * @param {import("express").Request} req 
             * @param {import("express").Response} res 
             * @returns 
             */
            process: async (req, res) => {
                try {
                    const user = await User.findOne({id: req.params.id})
                    
                    return res.status(200).send({
                        pseudo: user.username,
                        role: user.role,
                    });
                } catch (error) {
                    return res.status(404).send({ message: "user doesnt exist"})
                }
            }
        },
        {
            method: "post",
            endpoint: "/register",
            middleware: [],
            params: ["username", "password"],
            /**
             * 
             * @param {import("express").Request} req 
             * @param {import("express").Response} res 
             * @returns 
             */
            process: async (req, res) => {
                try {
                    const salt = bcrypt.genSaltSync(10);
                    const hash = bcrypt.hashSync(req.body.password, salt);
        
                    const user = await User.create({
                        username: req.body.username,
                        password: hash,
                    })
        
                    const accessToken = jwt.sign({ username: user.username, role: user.role }, token);
                    return res.send({ token: accessToken })
                    
                } catch (error) {
                    return res.status(409).send({ message: `${req.body.username} already exists`});
                }
            }
        },
        {
            method: "post",
            endpoint: "/login",
            middleware: [],
            params: ["username", "password"],
            /**
             * 
             * @param {import("express").Request} req 
             * @param {import("express").Response} res 
             * @returns 
             */
            process: async (req, res) => {
                try {
                    const user = await User.findOne({ username: req.body.username })
                    if (!bcrypt.compareSync(req.body.password, user.password)) {
                        return res.status(403).send({ message: "invalid credentials"})
                    }
        
                    const accessToken = jwt.sign({ username: user.username,  role: user.role }, token);
                    return res.send({ token: accessToken })
                } catch (error) {
                    return res.status(403).send({
                        message: "user doesnt exist"
                    });
                }
            }
        }
    ]
}


