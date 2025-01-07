import { QueryKey, useQuery, useMutation } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import { NEW_PROCEDURE_ROUTE, PROCEDURES_ROUTE, deleteProcedureWithIdRoute, editProcedureWithIdRoute, getProceduresListByProcedureIdRoute,GET_FILTERED_PROCEDURES_ROUTE } from 'src/api/procedures/routes';
import axiosClient from 'src/util/axios';

export const getProceduresList = (config?: AxiosRequestConfig) =>
  axiosClient
    .get<Procedure[]>(PROCEDURES_ROUTE, config)
    .then((res) => ({
      content: res.data,
      total: res.data.length,
      page: 1,
      pageSize: res.data.length,
    }));

    export const getFilteredProcedures = (
      fromDate: string,
      toDate: string,
      session: string,
      config?: AxiosRequestConfig,
    ) =>
      axiosClient
        .get<Procedure[]>(GET_FILTERED_PROCEDURES_ROUTE, {
          ...config,
          params: { fromDate, toDate, session },
        })
        .then((res) => res.data);
    
export const createProcedure = (
  id: string,
  payload: CreateProcedurePayload,
  config?: AxiosRequestConfig,
) => {
  const updatedPayload = { ...payload, patientId: id };
  return axiosClient.post<Procedure>(NEW_PROCEDURE_ROUTE, updatedPayload, config);
};

export const patchProcedure = (id: string, payload: CreateProcedurePayload) =>
  axiosClient.patch<Procedure, CreateProcedurePayload>(
    editProcedureWithIdRoute(id),
    payload,
  );

export const getProcedureDetail = (id: string, config?: AxiosRequestConfig) =>
  axiosClient
    .get<Procedure>(getProceduresListByProcedureIdRoute(id), config)
    .then((res) => res.data);

export const deleteProcedure = (id: string) =>
  axiosClient.delete<null>(deleteProcedureWithIdRoute(id));

/**
 * HOOKS
 */
export const useGetProceduresList = <Override = PaginatedResponse<Procedure>>(
  opts?: UseQueryOption<PaginatedResponse<Procedure>, Override>,
) => {
  const { key, useQueryConfig, apiConfig } = opts || {};
  const queryKey = (key || ['procedures', apiConfig.params]) as QueryKey;

  const { data, ...rest } = useQuery<PaginatedResponse<Procedure>>({
    queryKey,
    queryFn: ({ signal }) => getProceduresList({ ...apiConfig, signal }),
    enabled: !!apiConfig,
    ...useQueryConfig,
  });

  return { response: data, ...rest };
};

export const useCreateProcedure = (
  id: string,
  opts?: MutationConfig<Procedure, CreateProcedurePayload>,
) => {
  return useMutation({
    mutationFn: (payload: CreateProcedurePayload) => createProcedure(id, payload),
    ...opts,
  });
};

export const usePatchProcedure = (
  id: string,
  opts?: MutationConfig<Procedure, CreateProcedurePayload>,
) => {
  return useMutation({
    mutationFn: (payload: CreateProcedurePayload) => {
      return patchProcedure(id, payload);
    },
    ...opts,
  });
};

export const useGetProcedureDetail = <Override = Procedure>(
  opts: SingleUseQueryOption<Procedure, Override>,
) => {
  const { apiConfig, id } = opts;
  const queryKey = ['registry', id] as QueryKey;
  const { data, ...rest } = useQuery({
    queryKey,
    queryFn: ({ signal }) => getProcedureDetail(id, { ...apiConfig, signal }),
    enabled: !!id,
  });

  return { response: data, ...rest };
};

export const useDeleteProcedure = (opts?: MutationConfig<null, string>) => {
  return useMutation({
    mutationFn: (id: string) => deleteProcedure(id),
    ...opts,
  });
};

export const useGetFilteredProcedures = <Override = Procedure[]>(opts: UseQueryOption<Procedure[], Override> & {
  fromDate: string;
  toDate: string;
  session: string;
}) => {
  const { key, useQueryConfig, apiConfig, fromDate, toDate, session } = opts;
  const queryKey = (key || ['filtered-procedures', fromDate, toDate, session]) as QueryKey;

  const { data, ...rest } = useQuery<Procedure[]>({
      queryKey,
      queryFn: ({ signal }) =>
          getFilteredProcedures(fromDate, toDate, session, { ...apiConfig, signal }),
      enabled: !!fromDate && !!toDate && !!session,  // Ensures query is only enabled if all filters are set
      ...useQueryConfig,
  });

  return { response: data, ...rest };
};

