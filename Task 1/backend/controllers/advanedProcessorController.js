const { Queue, Worker } = require('bullmq')
const connection = require('../redis/connection')

const advancedQueue = new Queue('advancedQueue', { connection })

const advancedWorker = new Worker('advancedQueue', async job => {
    const { jobId } = job.data
    const dbJob = await findById(jobId).populate('originalImageId')
    if (!dbJob) throw new Error('Job not found')
    
    dbJob.status = 'processing'
    dbJob.startedAt = new Date()
    await dbJob.save()

})
