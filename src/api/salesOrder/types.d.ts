interface SaleOrder{
    billId: number;
    billNumber?: string;
    billDate: string;
    patientName?: string;
    totalAmount?: number;
    patientId: number;
  }
  type CreateSalePayload = Omit<SaleOrder, 'billId' | 'billNumber'>;


