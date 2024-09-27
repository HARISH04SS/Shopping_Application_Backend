require('dotenv').config();
mongoDBURL = process.env.mongodburl;
jwtSecret = process.env.jwt_secret;

module.exports = {
    mongoDBURL,
    jwtSecret
}