const express = require('express');
const Users = require('../models/users.model');

const router = express.Router();

router.get('/', async (req, res) => {
    const users = await Users.findAll()
    
    return res.status(200).send(users.map(u => { return {
        username: u.username,
        role: u.role,
    }}))
})

router.get('/:id([0-9]+)', async (req, res) => {
    try {
        const user = await Users.findByPk(req.params.id)
        
        return res.status(200).send({
            username: user.username,
            role: user.role,
        });
    } catch (error) {
        return res.status(404).send({ message: "user doesnt exist"})
    }
})

module.exports = router;

