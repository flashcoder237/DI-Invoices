import { get, post, put, remove } from './api';

export const fetchInvoices = () => get('/invoices');
export const createInvoice = (invoice) => post('/invoices', invoice);
export const updateInvoice = (invoiceId, invoice) => put(`/invoices/update/${invoiceId}`, invoice);
export const deleteInvoice = (invoiceId) => remove(`/invoices/delete/${invoiceId}`);
export const fetchInvoiceById  = (invoiceId) => get(`/invoices/${invoiceId}`)
