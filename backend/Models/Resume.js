const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let resumeSchema = new Schema({
    // id: { //user ID
    //     type: String,
    //     required: true
    // },
    content: { //id link to PDF
        type: String,
        required: true
    }
}, {
    collection: 'resumes'
})

module.exports = resumeSchema;