export const PURCHASE_TRANSACTION = 'api/medical/inventory';
export const PURCHASE_TRANSACTION_LIST = '/api/medical/inventory/inventoryTransactionList';
export const NEW_TRANSACTION_ROUTE = '/api/medical/inventory/addInventoryTransaction';
export const getPurchaseTransactionWithIdRoute = (id: string) => `${PURCHASE_TRANSACTION}/transactionDetails/${id}`;
export const editPurchaseTransactionWithIdRoute = (id: string) => `${PURCHASE_TRANSACTION}/updateTransaction/${id}`;
export const deletePurchaseTransactionWithIdRoute = (id: string) => `${PURCHASE_TRANSACTION}/deleteInventoryTransaction/${id}`;
export const getMedicinesListByPurchaseOrderIdRoute = (id: string) => `${PURCHASE_TRANSACTION}/${id}`; 


export const getAvailableMedicinesListByMedicineIdRoute = (id: string) => `${PURCHASE_TRANSACTION}/availableMedicines/${id}`