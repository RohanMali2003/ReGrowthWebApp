interface purchaseTransaction{
  medtransactionId: string;
  medicineName: string;
  medicineId: number;
  invoiceId: number;
  medicineBatch: string;
  expiry: string;
  medicinePack: number;
  quantity: number;
  availableQuantity: number;
  mrp: number;
  rate: number;
  amount: number;
}
type CreatePuchaseTransactionPayload = Omit<purchaseTransaction, 'medtransactionId'>;
