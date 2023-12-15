import { get, post, put, remove } from './api';

export const fetchCustomers = () => get('/customers');
export const createCustomer = (customer) => post('/customers', customer);
export const updateCustomer = (customerId, customer) => put(`/customers/${customerId}`, customer);
export const deleteCustomer = (customerId) => remove(`/customers/${customerId}`);
