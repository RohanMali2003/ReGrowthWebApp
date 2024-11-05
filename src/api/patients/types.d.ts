interface Patient {
  id: string;
  patientId: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  patientAge: number;
  patientGender: string;
  patientRegDate: Date;
  patientMobile1: string;
  patientMobile2?: string;
  patientMedicalHistory?: string;
  cashierName: string;
  patientReports?: string;
  timestamp: Date;
}

type CreatePatientPayload = Omit<Patient, 'patientId' | 'timestamp' | 'id'>;
