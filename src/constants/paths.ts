export const DASHBOARD_PATH = '/';

export const PATIENTS = '/patients';
export const NEW_PATIENT_PATH = '/patients/new';
export const EDIT_PATIENT_PATH = '/patients/:id/edit';
export const VIEW_PATIENT_PATH = '/patients/:id';
export const getEditPatientRoute = (id: string) => `${PATIENTS}/${id}/edit`;
export const getViewPatientPath = (id: string) => `${PATIENTS}/${id}`;

export const PROCEDURES = '/procedures';
export const VIEW_PROCEDURE_PATH = '/procedures/:id';
export const getViewProcedurePath = (id: string) => `${PROCEDURES}/${id}`;

export const MEDICINES = '/medicines';
export const INVENTORY = '/inventory';
export const LOGIN = '/login';
