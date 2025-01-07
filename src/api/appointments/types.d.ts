interface Appointments {
  appointmentId: number,
  firstName: string,
  middleName?: string,
  lastName: string,
  
  treatment: string,
  appointmentDate?: string,
  startTime?: string,
  patientmobile1: number,
  cashiername?: string,
  timestamp?: Date
}

type CreateAppointmentPayload = Omit<Appointments, 'appointmentId' | 'timestamp'>;