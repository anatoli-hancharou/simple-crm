import axios from '../services/axiosClient'

export const login = async (payload) => {
  return await axios.post('/auth/login', payload);
};

export const register = async (payload) => {
  return await axios.post('/auth/register', payload);
};

export const getAllCustomers = async () => {
  return await axios.get('/customers');
};

export const addCustomer = async (payload) => {
  return await axios.post('/customers', payload);
};

export const updateCustomer = async (id, payload) => {
  return await axios.put('/customers/' + id, payload);
};