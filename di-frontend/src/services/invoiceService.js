import { get, post, put, remove } from './api';

export const fetchInvoices = () => get('/invoices');
export const createInvoice = (invoice) => post('/invoice', invoice);
export const updateInvoice = (invoiceId, invoice) => put(`/invoice/${invoiceId}`, invoice);
export const deleteInvoice = (invoiceId) => remove(`/invoice/${invoiceId}`);
