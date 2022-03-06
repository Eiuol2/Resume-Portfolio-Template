const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

module.exports = {
  JWT_DB: process.env.JWT_DB,
  post_DB: process.env.MONGO_DB,
} /* (err) => {

/*

mongoose.Promise = global.Promise;

const url = process.env.MONGO_DB;

let mong = mongoose.connect(url, /*{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, */
// if (!err) {
//   console.log("MongoDB Connection Succeeded.")
// } else {
//   console.log("Error in DB connection: " + err)
// }
