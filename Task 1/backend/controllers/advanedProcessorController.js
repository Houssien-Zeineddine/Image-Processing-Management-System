const { Queue, Worker } = require('bullmq')
const connection = require('../redis/connection')

const advancedQueue = new Queue('advancedQueue', { connection })

const advancedWorker = new Worker('advancedQueue', async job => {
  
})
