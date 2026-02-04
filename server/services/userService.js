const usersDB = require('../repositories/usersDB');
const usersWS = require('../repositories/usersWS');

const getRegisteredUser = (username, email) => usersWS.getRegisteredUser(username, email);

const getAllUsers = (filters) => usersDB.getAllUsers(filters);
const getUserById = (id) => usersDB.getUserBId(id);
const addUser = (userObj) => usersDB.addUser(userObj)
const updateUser = (id, userObj) => usersDB.updateUser(id, userObj);
const deleteUser = (id) => usersDB.deleteUser(id);
module.exports = { getAllUsers, getUserById, addUser, updateUser, deleteUser, getRegisteredUser };