export const MEDICINES_ROUTE = '/api/medical/medicineList';
export const NEW_MEDICINE_ROUTE = '/api/medical/addMedicine';
export const getMedicineWithIdRoute = (id: string) => `/api/medical/medicineDetails/${id}`;
export const editMedicineWithIdRoute = (id: string) => `/api/medical/updateMedicine/${id}`;
export const deleteMedicineWithIdRoute = (id: string) => `/api/medical/deleteMedicine/${id}`;

export const getLowStockMedicineRoute =  '/api/medical/medicines/low-stock';