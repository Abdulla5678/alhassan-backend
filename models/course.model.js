const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        age: {
            type: String,
            required: true,
        },
        nationality: {
            type: String,
            required: true,
        },
        whatsappNumber: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        studyBefore: {
            type: String,
            required: true,
        },
        readingLevel: {
            type: String,
            required: true,
        },
        writingLevel: {
            type: String,
            required: true,
        },
        speakingLevel: {
            type: String,
            required: true,
        },
        listeningLevel: {
            type: String,
            required: true,
        },
        goal: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

module.exports = mongoose.model('Course', courseSchema);
