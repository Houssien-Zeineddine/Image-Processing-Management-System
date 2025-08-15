require('dotenv').config()

const IORedis = require('ioredis')

const connection = new IORedis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    maxRetriesPerRequest: null,
    enableReadyCheck: true 
})

connection.on('connect', () => {
    console.log('Connected to Redis Cloud successfully');
});

connection.on('error', (err) => {
    console.error('Redis connection error:', err);
});

module.exports = connection