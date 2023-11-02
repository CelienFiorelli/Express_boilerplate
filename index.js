const express = require('express');
const bodyParser = require('body-parser');

const usersController = require('./controllers/usersController');
const authController = require('./controllers/authController');
const db = require("./models");

const app = express();
const port = 5000

app.use(bodyParser.json());

app.listen(port, async () => {
    console.log(`[+] Listening on port ${port}`)
    db.sequelize.sync()
        .then(() => {
            console.log("[+] Synced database");
        })
        .catch((err) => {
            console.log("Failed to sync db: " + err.message);
        });

})

app.use('/user', usersController)
app.use('/', authController)