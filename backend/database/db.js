const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    db: process.env.JWT_DB
}