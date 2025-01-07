interface Procedure {
  patientId: number;
  procedureId: number;
  procedureCashierName: string;
  cashPayment: number;
  clinicName: string;
  discount: number;
  finalAmount: number;
  procedureDate: string;
  onlinePayment: number;
  procedureDetail: string;
  procedureType: string;
  totalAmount: number;
  timestamp: Date;
  cashierName: string;
}

type CreateProcedurePayload = Omit<procedure, 'procedureId' | 'patientId' | 'timestamp'>;
