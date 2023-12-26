import { get, post, put, remove } from './api';

export const fetchinvoicesItems = () => get('/invoicesitems');
export const createinvoicesItem = (invoiceItem) => post('/invoicesitems', invoiceItem);
export const updateinvoicesItem = (invoiceItemId, invoiceItem) => put(`/invoicesitems/${invoiceItemId}`, invoiceItem);
export const deleteinvoicesItem = (invoiceItemId) => remove(`/invoicesitems/${invoiceItemId}`);
export const fetchInvoicesByItemName = (invoiceName) => get(`/invoicesitems/${invoiceName}/invoices`);
