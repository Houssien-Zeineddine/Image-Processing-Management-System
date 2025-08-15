const Job = require('../models/job')

const getJobs = async (req, res) => {
    const jobs = await Job.find().populate('originalImageId')
    res.json(jobs)
}

const getJobById = async (req, res) => {
    const job = await Job.findById(req.params.id).populate('originalImageId')   
    if(!job) return res.status(404).json({ error: 'Job not found' })
    res.json(job)
}
