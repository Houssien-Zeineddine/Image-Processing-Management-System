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

    const originalImage = dbJob.originalImageId

    const { data, info } = await sharp(originalImage.fileData)
        .raw()
        .ensureAlpha()
        .toBuffer({ resolveWithObject: true })
    
    const { width, height } = info

    const pixels = []
    for (let y = 0; y < heightl; y++) {
        const row = []
        for (let x = 0; x < width; x++) {
            const idx = (y * width + x) * 4
            row.push({
                r: data[idx],
                g: data[idx + 1],
                b: data[idx + 2],
                a: data[idx + 3]
            })
        }
        pixels.push(row)
    }

})
