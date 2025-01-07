export const PURCHASE_ORDERS = 'api/medical/inventory';
export const PURCHASE_LIST = '/api/medical/inventory/invoiceList';
export const NEW_PURCHASE_ROUTE = '/api/medical/inventory/createInvoice';
export const getPurchaseOrderWithIdRoute = (id: string) => `${PURCHASE_ORDERS}/invoiceDetails/${id}`;
export const editPurchaseOrderWithIdRoute = (id: string) => `${PURCHASE_ORDERS}/updateInvoice/${id}`;
export const deletePurchaseOrderWithIdRoute = (id: string) => `${PURCHASE_ORDERS}/deleteInvoice/${id}`;
export const getMedicinesListByPurchaseOrderIdRoute = (id: string) => `${PURCHASE_ORDERS}/${id}`; 

