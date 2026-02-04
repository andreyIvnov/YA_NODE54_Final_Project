import axios from 'axios';
const EMPLOYEESDB_ENDPOINT = "http://localhost:3000/employees";
const getEmployees = (query) => axios.get(EMPLOYEESDB_ENDPOINT, { params: { query }, headers: { "x-access-token": sessionStorage.token }  });
const getEmployeeById = (id) => axios.get(`${EMPLOYEESDB_ENDPOINT}/${id}`, { params: { headers: { "x-access-token": sessionStorage.token } } });
export { getEmployees, getEmployeeById }