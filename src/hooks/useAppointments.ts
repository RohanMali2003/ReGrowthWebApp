import { QueryKey, useMutation, useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { APPOINTMENTS_ROUTE, deleteAppointmentWithIdRoute, editAppointmentWithIdRoute, getAppointmentWithIdRoute, NEW_APPOINTMENT_ROUTE ,getAppointmentByDateRoute } from "src/api/appointments/routes";
import axiosClient from "src/util/axios";

/**
 * API
 */
export const getAppointmentsList = (config?: AxiosRequestConfig) =>
  axiosClient
    .get<Appointments[]>(APPOINTMENTS_ROUTE, config)
    .then((res) => ({
      content: res.data,
      total: res.data.length,
      page: 1,
      pageSize: res.data.length,
    }));

export const createAppointment = (
  payload: CreateAppointmentPayload,
  config?: AxiosRequestConfig,
) => axiosClient.post<Appointments>(NEW_APPOINTMENT_ROUTE, payload, config);

export const patchAppointment = (id: string, payload: CreateAppointmentPayload) =>
  axiosClient.patch<Appointments, CreateAppointmentPayload>(
    editAppointmentWithIdRoute(id),
    payload,
  );

export const getAppointmentDetail = (id: string, config?: AxiosRequestConfig) =>
  axiosClient
    .get<Appointments>(getAppointmentWithIdRoute(id), config)
    .then((res) => res.data);

export const deleteAppointment = (id: string) =>
  axiosClient.delete<null>(deleteAppointmentWithIdRoute(id));


export const getAppointmentsByDate = (
  appointmentDate: string, 
  config?: AxiosRequestConfig
) =>
  axiosClient
    .get<Appointments[]>(getAppointmentByDateRoute(appointmentDate), config)
    .then((res) => res.data);
/**
 * HOOKS
 */
export const useGetAppointmentsList = <Override = PaginatedResponse<Appointments>>(
  opts?: UseQueryOption<PaginatedResponse<Appointments>, Override>,
) => {
  const { key, useQueryConfig, apiConfig } = opts || {};
  const queryKey = (key || ['appointments', apiConfig.params]) as QueryKey;

  const { data, ...rest } = useQuery<PaginatedResponse<Appointments>>({
    queryKey,
    queryFn: ({ signal }) => getAppointmentsList({ ...apiConfig, signal }),
    enabled: !!apiConfig,
    ...useQueryConfig,
  });

  return { response: data, ...rest };
};

export const useCreateAppointment = (
  opts?: MutationConfig<Appointments, CreateAppointmentPayload>,
) => {
  return useMutation({
    mutationFn: (payload: CreateAppointmentPayload) => createAppointment(payload),
    ...opts,
  });
};

export const usePatchAppointment = (
  id: string,
  opts?: MutationConfig<Appointments, CreateAppointmentPayload>,
) => {
  return useMutation({
    mutationFn: (payload: CreateAppointmentPayload) => {
      return patchAppointment(id, payload);
    },
    ...opts,
  });
};

export const useGetAppointmentDetail = <Override = Appointments>(
  opts: SingleUseQueryOption<Appointments, Override>,
) => {
  const { apiConfig, id } = opts;
  const queryKey = ['registry', id] as QueryKey;
  return useQuery({
    queryKey,
    queryFn: ({ signal }) => getAppointmentDetail(id, { ...apiConfig, signal }),
    enabled: !!id,
  });
};

export const useDeleteAppointment = (opts?: MutationConfig<null, string>) => {
  return useMutation({
    mutationFn: (id: string) => deleteAppointment(id),
    ...opts,
  });
};


export const useGetAppointmentsByDate = <Override = Appointments[]>(
  appointmentDate: string,
  opts?: UseQueryOption<Appointments[], Override>,
) => {
  const { key, useQueryConfig, apiConfig } = opts || {};
  const queryKey = (key || ['appointments', 'byDate', appointmentDate]) as QueryKey;

  const { data, ...rest } = useQuery<Appointments[]>({
    queryKey,
    queryFn: ({ signal }) => getAppointmentsByDate(appointmentDate, { ...apiConfig, signal }),
    enabled: !!appointmentDate,
    ...useQueryConfig,
  });

  return { response: data, ...rest };
};
