export const PROCEDURE = '/api/patients/procedure';
export const PROCEDURES_ROUTE = '/api/patients/procedure/list';
export const NEW_PROCEDURE_ROUTE = `${PROCEDURE}/createprocedure`;
export const getProceduresWithPatientIdRoute = (id: string) => `api/patients/procedures/${id}`;
export const getProceduresListByProcedureIdRoute = (id: string) => `${PROCEDURE}/${id}`;
export const deleteProcedureWithIdRoute = (id: string) => `${PROCEDURE}/delete/${id}`;
export const editProcedureWithIdRoute = (id: string) => `${PROCEDURE}/update/${id}`;

export const GET_FILTERED_PROCEDURES_ROUTE = '/api/patients/reports/bysession';

