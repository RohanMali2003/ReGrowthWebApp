import { QueryKey, useMutation, useQuery } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import {
  getSupplierWithIdRoute,
  SUPPLIERS_ROUTE,
} from 'src/api/inventory/suppliers/routes';
import axiosClient from 'src/util/axios';

/**
 * API
 */
export const getSuppliersList = (config?: AxiosRequestConfig) =>
  axiosClient
    .get<PaginatedResponse<Supplier>>(SUPPLIERS_ROUTE, config)
    .then((res) => res.data);

export const createSupplier = (
  payload: CreateSupplierPayload,
  config?: AxiosRequestConfig,
) => axiosClient.post<Supplier>(SUPPLIERS_ROUTE, payload, config);

export const getSupplierDetail = (id: string, config?: AxiosRequestConfig) =>
  axiosClient
    .get<Supplier>(getSupplierWithIdRoute(id), config)
    .then((res) => res.data);

export const patchSupplier = (id: string, payload: CreateSupplierPayload) =>
  axiosClient.patch<Supplier, CreateSupplierPayload>(
    getSupplierWithIdRoute(id),
    payload,
  );

export const deleteSupplier = (id: string) =>
  axiosClient.delete<null>(getSupplierWithIdRoute(id));
  
/**
 * HOOKS
 */
export const useGetSuppliersList = <Override = PaginatedResponse<Supplier>>(
  opts?: UseQueryOption<PaginatedResponse<Supplier>, Override>,
) => {
  const { key, useQueryConfig, apiConfig } = opts || {};
  const queryKey = (key || ['suppliers', apiConfig.params]) as QueryKey;

  const { data, ...rest } = useQuery<PaginatedResponse<Supplier>>({
    queryKey,
    queryFn: ({ signal }) => getSuppliersList({ ...apiConfig, signal }),
    enabled: !!apiConfig,
    ...useQueryConfig,
  });

  return { response: data, ...rest };
};

export const useCreateSupplier = (
  opts?: MutationConfig<Supplier, CreateSupplierPayload>,
) => {
  return useMutation({
    mutationFn: (payload: CreateSupplierPayload) => createSupplier(payload),
    ...opts,
  });
};

export const useGetSupplierDetail = <Override = Supplier>(
  opts: SingleUseQueryOption<Supplier, Override>,
) => {
  const { apiConfig, id } = opts;
  const queryKey = ['registry', id] as QueryKey;
  return useQuery({
    queryKey,
    queryFn: ({ signal }) => getSupplierDetail(id, { ...apiConfig, signal }),
    enabled: !!id,
  });
};

export const usePatchSupplier = (
  id: string,
  opts?: MutationConfig<Supplier, CreateSupplierPayload>,
) => {
  return useMutation({
    mutationFn: (payload: CreateSupplierPayload) => {
      return patchSupplier(id, payload);
    },
    ...opts,
  });
};

export const useDeleteSupplier = (opts?: MutationConfig<null, string>) => {
  return useMutation({
    mutationFn: (id: string) => deleteSupplier(id),
    ...opts,
  });
};
