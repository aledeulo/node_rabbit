'use strict';

const express = require('express')
const app = express()
const {publisher} = require('./publisher');
const promises = [];

const {SERVER_PORT} = process.env;
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.post('/endpoint', async (req, res) => {
    const message = JSON.stringify(req.body);
    promises.push(
        publisher.publishRecord(message)
            .then(() => {
                console.info("Message published!!!");
                res.end("ALL GOOD");
            }).catch((error) => {
            console.error('An error happened when publish message: %s with error:%s',
                message, error.message);
            process.exit(0);
        })
    );
    await Promise.all(promises);
    console.log(req.body)
})

app.listen(SERVER_PORT, () => console.log('Server running on port %s!', SERVER_PORT))

