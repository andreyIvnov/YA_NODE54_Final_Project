const https = require('https');
const axios = require('axios');
const httpsAgent = new https.Agent({rejectUnauthorized: false});
const USERS_ENDPOINT = "https://jsonplaceholder.typicode.com/users";
const getRegisteredUser = (username, email) => axios.get(`${USERS_ENDPOINT}?username=${username}&email=${email}`, { httpsAgent });
module.exports = {
    getRegisteredUser
}