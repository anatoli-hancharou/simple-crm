import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4200';

export const Login = async (data) => {
  return await axios.post('/auth/login', data);
};

export const getAllCustomers = () => {
  return axios.get('/customers');
};