interface Patient {
  patientId: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  patientAge: number;
  patientGender: string;
  patientRegDate: string;
  patientMobile1: number;
  patientMobile2?: number;
  patientMedicalHistory?: string;
  cashierName: string;
  patientReports?: string;
  timestamp: Date;
}

type CreatePatientPayload = Omit<Patient, 'patientId' | 'timestamp'>;
