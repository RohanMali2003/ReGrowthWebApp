import { QueryKey, useQuery, useMutation } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import { PROCEDURES_ROUTE, getProceduresWithIdRoute } from 'src/api/procedures/routes';
import axiosClient from 'src/util/axios';

export const getProceduresList = (config?: AxiosRequestConfig) =>
  axiosClient
    .get<PaginatedResponse<Procedure>>(PROCEDURES_ROUTE, config)
    .then((res) => res.data);

export const createProcedure = (
  payload: CreateProcedurePayload,
  config?: AxiosRequestConfig,
) => axiosClient.post<Procedure>(PROCEDURES_ROUTE, payload, config);

export const patchProcedure = (id: string, payload: CreateProcedurePayload) =>
  axiosClient.patch<Procedure, CreateProcedurePayload>(
    getProceduresWithIdRoute(id),
    payload,
  );

export const getProcedureDetail = (id: string, config?: AxiosRequestConfig) =>
  axiosClient
    .get<Procedure>(getProceduresWithIdRoute(id), config)
    .then((res) => res.data);

export const deleteProcedure = (id: string) =>
  axiosClient.delete<null>(getProceduresWithIdRoute(id));

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
  opts?: MutationConfig<Procedure, CreateProcedurePayload>,
) => {
  return useMutation({
    mutationFn: (payload: CreateProcedurePayload) => createProcedure(payload),
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
  return useQuery({
    queryKey,
    queryFn: ({ signal }) => getProcedureDetail(id, { ...apiConfig, signal }),
    enabled: !!id,
  });
};

export const useDeleteProcedure = (opts?: MutationConfig<null, string>) => {
  return useMutation({
    mutationFn: (id: string) => deleteProcedure(id),
    ...opts,
  });
};