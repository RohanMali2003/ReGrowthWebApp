interface PurchaseOrder{
  invoiceId: number;
  inoviceNumber?: string;
  purchaseDate: string;
  vendorName?: string;
  totalAmount: number;
}
type CreatePurchasePayload = Omit<PurchaseOrder, 'invoiceId'>;