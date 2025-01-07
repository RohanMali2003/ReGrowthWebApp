export const PATIENTS = 'api/patients';
export const PATIENTS_ROUTE = 'api/patients/patientList';
export const NEW_PATIENT_ROUTE = '/api/patients/create';
export const getPatientWithIdRoute = (id: string) => `${PATIENTS}/patientDetails/${id}`;
export const editPatientWithIdRoute = (id: string) => `${PATIENTS}/update/${id}`;
export const deletePatientWithIdRoute = (id: string) => `${PATIENTS}/delete/${id}`;
export const getProceduresListByPatientIdRoute = (id: string) => `${PATIENTS}/procedures/${id}`; 