import axios from 'axios';
const LOGIN_ENDPOINT = "http://localhost:3000/auth/login"
const getRegisteredUser = (username, email) => axios.post(LOGIN_ENDPOINT, { username: username, email:email });
export { getRegisteredUser };