
const mongoose = require('mongoose');

const courseScheme = new mongoose.Schema({
    name: {
        type :String,
        required: true
    },
    age: {
        type :String,
        required: true
    },
    nationality: {
        type :String,
        required: true
    },
    whatsappNumber: {
        type :String,
        required: true
    },
    email: {
        type :String,
        required: true
    },
    studyBefore: {
        type :String,
        required: true
    },
    readingLevel: {
        type :String,
        required: true
    },
    writingLevel: {
        type :String,
        required: true
    },
    speakingLevel: {
        type :String,
        required: true
    },
    listeningLevel: {
        type :String,
        required: true
    },
    goal: {
        type :String,
        required: true
    },
})

module.exports = mongoose.model('Course',courseScheme)