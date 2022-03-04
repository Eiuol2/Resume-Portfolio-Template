const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    DB: process.env.JWT_DB,
  };
  

mongoose.Promise = global.Promise;

const url = process.env.MONGODB_URL;

let mong = mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});

