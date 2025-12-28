const Shift = require('../models/shiftModel');
const getAllShifts = (filters) => Shift.find(filters);
const getShiftBId = (id) => Shift.findById(id);
const addShift = (shiftObj) => Shift.create(shiftObj);
const updateShift = (id, shiftObj) => Shift.findByIdAndUpdate(id, shiftObj);
const deleteShift = (id) => Shift.findByIdAndDelete(id);
module.exports = {
    getAllShifts,
    getShiftBId,
    addShift,
    updateShift,
    deleteShift
}