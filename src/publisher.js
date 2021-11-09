'use strict';

const amqp = require('amqplib');

const {AMQP_URL, EXCHANGE, QUEUE, ROUTING_KEY} = process.env;

const publishMessage = async (record) => {
    const connection = await amqp.connect(AMQP_URL, 'heartbeat=60');
    const channel = await connection.createChannel();
    try {
        console.log('Publishing');
        await channel.assertExchange(EXCHANGE, 'direct', {durable: true});
        await channel.assertQueue(QUEUE, {durable: true});
        await channel.bindQueue(QUEUE, EXCHANGE, ROUTING_KEY);
        await channel.publish(EXCHANGE, ROUTING_KEY, Buffer.from(JSON.stringify(record)));
    } catch (e) {
        console.error('Error in publishing message', e);
    } finally {
        console.info('Closing channel and connection if available');
        await channel.close();
        await connection.close();
        console.info('Channel and connection closed');
    }
};

const Publisher = {
    async publishRecord(record) {
        console.info('Received message %s', record);
        await publishMessage(record);
    },
};

exports.publisher = Publisher;
