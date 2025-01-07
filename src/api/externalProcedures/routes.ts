export const EXTERNAL_PROCEDURE = '/api/patients/external-procedure';
export const EXTERNAL_PROCEDURES_ROUTE = `${EXTERNAL_PROCEDURE}/list`;
export const NEW_EXTERNAL_PROCEDURE_ROUTE = `${EXTERNAL_PROCEDURE}/save`;
export const getExternalProcedureWithDoctorIdRoute = (id: string) => `${EXTERNAL_PROCEDURE}/${id}`;
export const editExternalProcedureWithDoctorIdRoute = (id: string) => `${EXTERNAL_PROCEDURE}/edit/${id}`;
export const deleteExternalProcedureWithDoctorIdRoute = (id: string) => `${EXTERNAL_PROCEDURE}/delete/${id}`;

export const GET_FILTERED_EXTERNAL_PROCEDURES_ROUTE = '/api/patients/external-procedure/reports/procedures-by-date';