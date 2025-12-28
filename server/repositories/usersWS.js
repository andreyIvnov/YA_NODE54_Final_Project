const axios = require('axios');
const USERS_ENDPOINT = "https://jsonplaceholder.typicode.com/users";
const getRegisteredUser = (username, email) => axios.get(`${USERS_ENDPOINT}?username=${username}&email=${email}`)
module.exports = {
    getRegisteredUser
}