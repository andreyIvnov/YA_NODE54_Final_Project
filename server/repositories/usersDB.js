const User = require('../models/userModel');
const getAllUsers = (filters) => User.find(filters);
const getUserBId = (id) => User.findById(id);
const addUser = (userObj) => User.create(userObj);
const updateUser = (id, userObj) => User.findByIdAndUpdate(id, userObj);
const deleteUser = (id) => User.findByIdAndDelete(id);
module.exports = {
    getAllUsers,
    getUserBId,
    addUser,
    updateUser,
    deleteUser
}