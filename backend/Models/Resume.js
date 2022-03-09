const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let resumeSchema = new Schema({
    id: { //user ID
        type: int,
        required: true
    },
    content: { //id link to PDF
        type: String,
        required: true
    }
}, {
    collection: 'resume'
})

module.exports = mongoose.model('Resume', resumeSchema);