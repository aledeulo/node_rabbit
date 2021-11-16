'use strict';

const amqp = require('amqplib');
const {AMQP_URL, EXCHANGE, QUEUE} = process.env

amqp.connect(AMQP_URL, function (error0, connection) {
    if (error0) {
        throw error0;
    }

    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }

        channel.assertExchange(EXCHANGE, 'direct', {
            durable: false
        });

        channel.assertQueue(QUEUE, {
            exclusive: true
        }, function (error2) {
            if (error2) {
                throw error2;
            }
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", QUEUE);
            channel.bindQueue(QUEUE, EXCHANGE, '');

            channel.consume(QUEUE, function (msg) {
                if (msg.content) {
                    console.log(" [x] %s", msg.content.toString());
                }
            }, {
                noAck: true
            });
        });
    });
});