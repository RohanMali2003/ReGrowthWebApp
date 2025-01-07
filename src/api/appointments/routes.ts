export const APPOINTMENTS = '/api/appointments';
export const APPOINTMENTS_ROUTE = `${APPOINTMENTS}/list`;
export const NEW_APPOINTMENT_ROUTE = `${APPOINTMENTS}/create`;

export const getAppointmentByDateRoute  = (appointmentDate: string) =>  `${APPOINTMENTS}/reports/${appointmentDate}`;

export const getAppointmentWithIdRoute = (id: string) => `${APPOINTMENTS}/details/${id}`;
export const editAppointmentWithIdRoute = (id: string) => `${APPOINTMENTS}/edit/${id}`;
export const deleteAppointmentWithIdRoute = (id: string) => `${APPOINTMENTS}/delete/${id}`;



