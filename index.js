const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const bodyParser = require('body-parser');
const { connectString } = require('./config.json');
const { verifyParams } = require('./middleware/verifyParams');

const app = express();
const port = 5000

app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`[+] Listening on port ${port}`)
    mongoose.connect(connectString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
            console.log("[+] Database connected");
        })
        .catch((err) => {
            console.error(`Error\n${err}`);
        })
})


for (const file of fs.readdirSync('./controllers')) {
    const controller = require(`./controllers/${file}`);
    for (const endpoint of controller.endpoints) {
        const middleware = endpoint.hasOwnProperty('middleware') ? endpoint.middleware : []
        app[endpoint.method](endpoint.endpoint, verifyParams(endpoint), ...middleware, endpoint.process)
    }
}