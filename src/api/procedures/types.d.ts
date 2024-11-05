interface Procedure {
  id: string;
  procedureId: number;
  procedureCashierName: string;
  cashPayment: number;
  clinicName: string;
  discount: number;
  finalAmount: number;
  procedureDate: Date;
  onlinePayment: number;
  procedureDetails: string;
  procedureType: string;
  procedureTime: Date;
  totalAmount: number;
  patientName: string;
  timeStamp: Date;
}

type CreateProcedurePayload = Omit<procedure, 'proceduretId' | 'procedureTime' | 'id'>;
