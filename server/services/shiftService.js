const shiftDB = require('../repositories/shiftsDB');
const getAllShifts = (filters) => shiftDB.getAllShifts(filters);
const getShiftById = (id) => shiftDB.getShiftBId(id);
const addShift = (shiftObj) => shiftDB.addShift(shiftObj)
const updateShift = (id, shiftObj) => shiftDB.updateShift(id, shiftObj);
const deleteShift = (id) => shiftDB.deleteShift(id);
module.exports = { getAllShifts, getShiftById, addShift, updateShift, deleteShift };