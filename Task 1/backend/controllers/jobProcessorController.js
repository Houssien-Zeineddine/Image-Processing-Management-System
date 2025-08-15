const IORedis = require('ioredis')
const { Queue, Worker } = require('bullmq')
const Job = require('../models/job') 

const connection = new IORedis()

//create a queue
const imageQueue = new Queue('imageQueue', { connection })

const worker = new Worker('imageQueue', async job => {
    const { jobId } = job.data
    const dbJob = await Job.findById(jobId).populate('originalImageId')

    if (!dbJob) throw new Error('Job not Found')

    dbJob.status = 'processing'
    dbJob.startedAt = new Date()
    await dbJob.save()

    const originalImage = dbJob.originalImageId

    for (let i = 0; i < dbJob.targetDimensions.length; i++) {
        const target = dbJob.targetDimensions[i]
    }
})