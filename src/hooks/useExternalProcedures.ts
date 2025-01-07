import { QueryKey, useMutation, useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { deleteExternalProcedureWithDoctorIdRoute, editExternalProcedureWithDoctorIdRoute, EXTERNAL_PROCEDURES_ROUTE, getExternalProcedureWithDoctorIdRoute, NEW_EXTERNAL_PROCEDURE_ROUTE, GET_FILTERED_EXTERNAL_PROCEDURES_ROUTE } from "src/api/externalProcedures/routes";
import axiosClient from "src/util/axios";

/**
 * API
 */
export const getExternalProcedureList = (config?: AxiosRequestConfig) =>
  axiosClient
    .get<ExternalProcedure[]>(EXTERNAL_PROCEDURES_ROUTE, config)
    .then((res) => ({
      content: res.data,
      total: res.data.length,
      page: 1,
      pageSize: res.data.length,
    }));

    export const getFilteredExternalProcedures = (
      fromDate: string,
      toDate: string,
      
      config?: AxiosRequestConfig,
    ) =>
      axiosClient
        .get<ExternalProcedure[]>(GET_FILTERED_EXTERNAL_PROCEDURES_ROUTE, {
          ...config,
          params: { fromDate, toDate },
        })
        .then((res) => res.data);    

export const createExternalProcedure = (
  payload: CreateExternalProcedurePayload,
  config?: AxiosRequestConfig,
) => axiosClient.post<ExternalProcedure>(NEW_EXTERNAL_PROCEDURE_ROUTE, payload, config);

export const patchExternalProcedure = (id: string, payload: CreateExternalProcedurePayload) =>
  axiosClient.patch<ExternalProcedure, CreateExternalProcedurePayload>(
    editExternalProcedureWithDoctorIdRoute(id),
    payload,
  );

export const getExternalProcedureDetail = (id: string, config?: AxiosRequestConfig) =>
  axiosClient
    .get<ExternalProcedure>(getExternalProcedureWithDoctorIdRoute(id), config)
    .then((res) => res.data);

export const deleteExternalProcedure = (id: string) =>
  axiosClient.delete<null>(deleteExternalProcedureWithDoctorIdRoute(id));
/**
 * HOOKS
 */
export const useGetExternalProcedureList = <Override = PaginatedResponse<ExternalProcedure>>(
  opts?: UseQueryOption<PaginatedResponse<ExternalProcedure>, Override>,
) => {
  const { key, useQueryConfig, apiConfig } = opts || {};
  const queryKey = (key || ['externalProcedure', apiConfig.params]) as QueryKey;

  const { data, ...rest } = useQuery<PaginatedResponse<ExternalProcedure>>({
    queryKey,
    queryFn: ({ signal }) => getExternalProcedureList({ ...apiConfig, signal }),
    enabled: !!apiConfig,
    ...useQueryConfig,
  });

  return { response: data, ...rest };
};

export const useCreateExternalProcedure = (
  opts?: MutationConfig<ExternalProcedure, CreateExternalProcedurePayload>,
) => {
  return useMutation({
    mutationFn: (payload: CreateExternalProcedurePayload) => createExternalProcedure(payload),
    ...opts,
  });
};

export const usePatchExternalProcedure = (
  id: string,
  opts?: MutationConfig<ExternalProcedure, CreateExternalProcedurePayload>,
) => {
  return useMutation({
    mutationFn: (payload: CreateExternalProcedurePayload) => {
      return patchExternalProcedure(id, payload);
    },
    ...opts,
  });
};

export const useGetExternalProcedureDetail = <Override = ExternalProcedure>(
  opts: SingleUseQueryOption<ExternalProcedure, Override>,
) => {
  const { apiConfig, id } = opts;
    const queryKey = ['registry', id] as QueryKey;
    const { data, ...rest } = useQuery({
      queryKey,
      queryFn: ({ signal }) => getExternalProcedureDetail(id, { ...apiConfig, signal }),
      enabled: !!id,
    });
  
    return { response: data, ...rest };
};

export const useDeleteExternalProcedure = (opts?: MutationConfig<null, string>) => {
  return useMutation({
    mutationFn: (id: string) => deleteExternalProcedure(id),
    ...opts,
  });
};

export const useGetFilteredExternalProcedures = <Override = ExternalProcedure[]>(opts: UseQueryOption<ExternalProcedure[], Override> & {
  fromDate: string;
  toDate: string;
  
}) => {
  const { key, useQueryConfig, apiConfig, fromDate, toDate } = opts;
  const queryKey = (key || ['filtered-procedures', fromDate, toDate]) as QueryKey;

  const { data, ...rest } = useQuery<ExternalProcedure[]>({
      queryKey,
      queryFn: ({ signal }) =>
          getFilteredExternalProcedures(fromDate, toDate, { ...apiConfig, signal }),
      enabled: !!fromDate && !!toDate ,  // Ensures query is only enabled if all filters are set
      ...useQueryConfig,
  });

  return { response: data, ...rest };
};
