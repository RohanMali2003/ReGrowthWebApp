interface SalesTransaction{
    
    billTransactionId: number;
    medQuantity?: number;
    medName: string;
    medMrp: number;
    medtransactionId: number;
    medicineBatch: string;
    totalAmount: number;
    billNumber: number;
    medicineNumber: number;

  }
  type CreateSaleTransactionPayload = Omit<SalesTransaction, 'billTransactionId'>;



