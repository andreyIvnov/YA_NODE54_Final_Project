import axios from 'axios';
const DEPARTMENTSDB_ENDPOINT = "http://localhost:3000/departments";
const getDepartments = (query) => axios.get(DEPARTMENTSDB_ENDPOINT, { params: { query }, headers: { "x-access-token": sessionStorage.token }  });
const getDepartmentById = (id) => axios.get(`${DEPARTMENTSDB_ENDPOINT}/${id}`, { params: { headers: { "x-access-token": sessionStorage.token } } });
export { getDepartments, getDepartmentById }