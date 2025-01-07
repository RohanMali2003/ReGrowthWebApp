interface Supplier {  
  id: string;
  supplierId: number;
  supplierName: string;
  supplierAddress: string;
  supplierMobile: number;
}

type CreateSupplierPayload = Omit<Supplier, 'supplierId' | 'id'>;