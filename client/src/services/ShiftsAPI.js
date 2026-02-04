import axios from 'axios';
const SHIFTSDB_ENDPOINT = "http://localhost:3000/shifts";
const getShifts = (query) => axios.get(SHIFTSDB_ENDPOINT, { params: { query }, headers: { "x-access-token": sessionStorage.token }  });
const getShiftById = (id) => axios.get(`${SHIFTSDB_ENDPOINT}/${id}`, { params: { headers: { "x-access-token": sessionStorage.token } } });
export { getShifts, getShiftById }