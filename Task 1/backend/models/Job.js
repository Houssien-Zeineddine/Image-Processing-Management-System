const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    originalImageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Image', required: true },
    status: { type: String, enum: ['pending', 'processing', 'completed', 'failed'], default: 'pending' },
    targetDimensions: [{ width: Number, height: Number, status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' }}],
    userEmail: { type: String },
    progress: { type: Number, default: 0 }, // 0-100%
    notifications: [{ type: String, sentAt: Date, success: Boolean }],
    createdAt: { type: Date, default: Date.now },
    startedAt: { type: Date },
    completedAt: { type: Date }
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;