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

    const sharpenKernel = [
        [0, -1, 0],
        [-1, 5, -1],
        [0, -1, 0]
    ];

    const applyKernel = (pixels, kernel) => {
        const output = []
        const kCenter = Math.floor(kernel.length / 2)

        for (let y = 0; y < pixels.length; y++) {
            const row = []
            for (let x = 0; x < pixels[y].length; x++) {
                let r = 0, g = 0, b = 0
                for (let ky = 0; ky < kernel.length; ky++) {
                    for (let kx = 0; kx < kernel[0].length; kx++) {
                        const yy = y + ky - kCenter;
                        const xx = x + kx - kCenter;
                        if (yy >= 0 && yy < pixels.length && xx >= 0 && xx < pixels[0].length) {
                            r += pixels[yy][xx].r * kernel[ky][kx];
                            g += pixels[yy][xx].g * kernel[ky][kx];
                            b += pixels[yy][xx].b * kernel[ky][kx];
                        }
                    }
                }
                row.push({
                    r: Math.min(Math.max(Math.round(r), 0), 255),
                    g: Math.min(Math.max(Math.round(g), 0), 255),
                    b: Math.min(Math.max(Math.round(b), 0), 255),
                    a: pixels[y][x].a
                })
            }
            output.push(row)
        }
        return output
    }

    const processedPixels = applyKernel(pixels, sharpenKernel)

})
