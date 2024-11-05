import { QueryKey, useQuery } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import { PROCEDURES_ROUTE, getProceduresWithIdRoute } from 'src/api/procedures/routes';
import axiosClient from 'src/util/axios';

export const getProceduresList = (config?: AxiosRequestConfig) =>
  axiosClient
    .get<PaginatedResponse<Procedure>>(PROCEDURES_ROUTE, config)
    .then((res) => res.data);

export const getProcedureDetail = (id: string, config?: AxiosRequestConfig) =>
  axiosClient
    .get<Procedure>(getProceduresWithIdRoute(id), config)
    .then((res) => res.data);

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