const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {
    collection: 'posts'
})

module.exports = postSchema;