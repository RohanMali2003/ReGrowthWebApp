import { QueryKey, useMutation, useQuery } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import { deletePatientWithIdRoute, editPatientWithIdRoute, getPatientWithIdRoute, getProceduresListByPatientIdRoute, NEW_PATIENT_ROUTE, PATIENTS_ROUTE } from 'src/api/patients/routes';
import axiosClient from 'src/util/axios';

/**
 * Backend TODO:
 * - Support pagination
 * - Support filtering
 * - Support sorting
 * - Support searching
 * - patientId and timestamp should be auto-generated
 * - Support PATCH request for updating patient
 * - File upload for patientReports
 * - API validations for CreatePatientPayload
 * - Send newly created patient object in create/edit response
 */

/**
 * API
 */
export const getPatientList = (config?: AxiosRequestConfig) =>
  axiosClient
    .get<PaginatedResponse<Patient>>(PATIENTS_ROUTE, config)
    .then((res) => res.data);

export const getProceduresListByPatientId = (id: string, config?: AxiosRequestConfig) =>
  axiosClient
    .get<Procedure[]>(getProceduresListByPatientIdRoute(id), config)
    .then((res) => ({
      content: res.data,
      total: res.data.length,
      page: 1,
      pageSize: res.data.length,
    }));
    
export const createPatient = (
  payload: CreatePatientPayload,
  config?: AxiosRequestConfig,
) => axiosClient.post<Patient>(NEW_PATIENT_ROUTE, payload, config);

export const getPatientDetail = (id: string, config?: AxiosRequestConfig) =>
  axiosClient
    .get<Patient>(getPatientWithIdRoute(id), config)
    .then((res) => res.data);

export const patchPatient = (id: string, payload: CreatePatientPayload) =>
  axiosClient.patch<Patient, CreatePatientPayload>(
    editPatientWithIdRoute(id),
    payload,
  );

export const deletePatient = (id: string) =>
  axiosClient.delete<null>(deletePatientWithIdRoute(id));

/**
 * HOOKS
 */
export const useGetPatientList = <Override = PaginatedResponse<Patient>>(
  opts?: UseQueryOption<PaginatedResponse<Patient>, Override>,
) => {
  const { key, useQueryConfig, apiConfig } = opts || {};
  const queryKey = (key || ['patients', apiConfig.params]) as QueryKey;

  const { data, ...rest } = useQuery<PaginatedResponse<Patient>>({
    queryKey,
    queryFn: ({ signal }) => getPatientList({ ...apiConfig, signal }),
    enabled: !!apiConfig,
    ...useQueryConfig,
  });

  return { response: data, ...rest,  };
};

export const useGetProceduresListByPatientId = <Override = PaginatedResponse<Procedure>>(
  id: string,
  opts?: UseQueryOption<PaginatedResponse<Procedure>, Override>,
) => {
  const { key, useQueryConfig, apiConfig } = opts || {};
  const queryKey = (key || ['patientProcedures', id]) as QueryKey;

  const { data, ...rest } = useQuery<PaginatedResponse<Procedure>>({
    queryKey,
    queryFn: ({ signal }) => getProceduresListByPatientId(id, { ...apiConfig, signal }),
    enabled: !!apiConfig,
    ...useQueryConfig,
  });

  return { response: data, ...rest };
};

export const useCreatePatient = (
  opts?: MutationConfig<Patient, CreatePatientPayload>,
) => {
  return useMutation({
    mutationFn: (payload: CreatePatientPayload) => createPatient(payload),
    ...opts,
  });
};

export const useGetPatientDetail = <Override = Patient>(
  opts: SingleUseQueryOption<Patient, Override>,
) => {
  const { apiConfig, id } = opts;
  const queryKey = ['registry', id] as QueryKey;
  return useQuery({
    queryKey,
    queryFn: ({ signal }) => getPatientDetail(id, { ...apiConfig, signal }),
    enabled: !!id,
  });
};

export const usePatchPatient = (
  id: string,
  opts?: MutationConfig<Patient, CreatePatientPayload>,
) => {
  return useMutation({
    mutationFn: (payload: CreatePatientPayload) => {
      return patchPatient(id, payload);
    },
    ...opts,
  });
};

export const useDeletePatient = (opts?: MutationConfig<null, string>) => {
  return useMutation({
    mutationFn: (id: string) => deletePatient(id),
    ...opts,
  });
};
