const { Queue, Worker } = require('bullmq')
const Job = require('../models/job') 
const Image = require('../models/Image')
const sharp = require('sharp')
const connection = require('../redis/connection')
const sendEmail = require('../utils/sendEmail')

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
        try {
            const resizedBuffer = await sharp(originalImage.fileData)
                .resize(target.width, target.height)
                .toBuffer()

            //save resized image to database
            await Image.create({
                name: `${originalImage.name}-${target.width}x${target.height}`,
                filename: originalImage.filename,
                fileData: resizedBuffer,
                fileSize: resizedBuffer.length
            })

            target.status = 'completed'
            dbJob.progress = Math.floor(((i + 1) / dbJob.targetDimensions.length) * 100)
            await dbJob.save()

            console.log(`Resized ${originalImage.name} to ${target.width}x${target.height}`);
        } catch( error ) {
            target.status = 'failed'
            await dbJob.save()
            console.log(`Failed to resize ${originalImage.name} to ${target.width}x${target.height}`, error)
        }
    }

    dbJob.status = 'completed'
    dbJob.completedAt = new Date()
    await dbJob.save()

    const processingTimeMs = Date.now() - startTime
    const processingTime = `${Math.floor(processingTimeMs / 1000)}s`

    if (dbJob.userEmail) {
        const subject = `Image Processing Completed: ${originalImage.filename}`;
        const html = `
            <h3>Your image processing job is complete!</h3>
            <p><b>Original file:</b> ${originalImage.filename}</p>
            <p><b>Resized dimensions:</b></p>
            <ul>
                ${dbJob.targetDimensions.map(t => `<li>${t.width}x${t.height} - ${t.status}</li>`).join('')}
            </ul>
            <p><b>Processing time:</b> ${processingTime}</p>`

            await sendEmail(dbJob.userEmail, subject, html)
    } else {
        console.log('Job completed')
    }
}, {
    connection,
    defaultJobOptions: { //clean completed jobs automatically
        removeOnComplete: 100, 
        removeOnFail: 50
    }
})

worker.on('ready', () => {
    console.log('Worker is ready and connected to Redis');
});

worker.on('failed', (job, err) => {
    console.error(`Job ${job.id} failed:`, err);
});

module.exports = { imageQueue }