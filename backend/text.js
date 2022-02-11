const mongoose = require("mongoose");

const TextSchema = new mongoose.Schema({
    id: {
        type : String,
        require: true,
        trim: true,
    },
    text: {
        type : String,
        require: true,
        trim: true,
    },
    user:{
        type : String,
        require: true,
        trim: true,
    }
}, {collection : 'texts'});

module.exports = TextSchema;