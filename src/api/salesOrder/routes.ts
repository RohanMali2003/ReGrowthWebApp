export const SALES_ORDERS = 'api/medical/bill';
export const SALES_LIST = '/api/medical/bill/medicalBillsList';
export const NEW_SALE_ROUTE = '/api/medical/bill/createMedicalBill';
export const getSaleOrderWithIdRoute = (id: string) => `${SALES_ORDERS}/medicalBillDetails/${id}`;
export const editSaleOrderWithIdRoute = (id: string) => `${SALES_ORDERS}/updateMedicalBill/${id}`;
export const deleteSaleOrderWithIdRoute = (id: string) => `${SALES_ORDERS}/deleteMedicalBill/${id}`;
export const getMedicinesListBySaleOrderIdRoute = (id: string) => `${SALES_ORDERS}/${id}`; 
