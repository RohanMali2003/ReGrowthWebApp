import { QueryKey, useQuery, useMutation } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import {
  SALE_TRANSACTION_LIST,
  NEW_TRANSACTION_ROUTE,
  getSaleTransactionWithIdRoute,
  editSaleTransactionWithIdRoute,
  deleteSaleTransactionWithIdRoute,
  
} from 'src/api/salesTransactions/routes'; // Adjust the import path
import axiosClient from 'src/util/axios';

/**
 * API
 */
export const getSalesTransactionList = (config?: AxiosRequestConfig) =>
  axiosClient
    .get<SalesTransaction[]>(SALE_TRANSACTION_LIST, config)
    .then((res) => ({
      content: res.data,
      total: res.data.length,
      page: 1,
      pageSize: res.data.length,
    }));

export const createSalesTransaction = (
  payload: CreateSaleTransactionPayload,
  config?: AxiosRequestConfig
) => axiosClient.post<SalesTransaction>(NEW_TRANSACTION_ROUTE, payload, config).then((res) => res.data);

export const patchSalesTransaction = (id: string, payload: CreateSaleTransactionPayload) =>
  axiosClient.patch<SalesTransaction>(
    editSaleTransactionWithIdRoute(id),
    payload
  ).then((res) => res.data);

export const getSalesTransactionDetail = (id: string, config?: AxiosRequestConfig) =>
  axiosClient
    .get<SalesTransaction>(getSaleTransactionWithIdRoute(id), config)
    .then((res) => res.data);

export const deleteSalesTransaction = (id: string) =>
  axiosClient.delete<null>(deleteSaleTransactionWithIdRoute(id));

/**
 * HOOKS
 */
export const useGetSalesTransactionList = <
  Override = PaginatedResponse<SalesTransaction>
>(
  opts?: UseQueryOption<PaginatedResponse<SalesTransaction>, Override>
) => {
  const { key, useQueryConfig, apiConfig } = opts || {};
  const queryKey = (key || ['salesTransactions', apiConfig?.params]) as QueryKey;

  const { data, ...rest } = useQuery<PaginatedResponse<SalesTransaction>>({
    queryKey,
    queryFn: ({ signal }) => getSalesTransactionList({ ...apiConfig, signal }),
    enabled: !!apiConfig,
    ...useQueryConfig,
  });

  return { response: data, ...rest };
};

export const useCreateSalesTransaction = (
  opts?: MutationConfig<SalesTransaction, CreateSaleTransactionPayload>
) => {
  return useMutation({
    mutationFn: (payload: CreateSaleTransactionPayload) =>
      createSalesTransaction(payload),
    ...opts,
  });
};

export const usePatchSalesTransaction = (
  id: string,
  opts?: MutationConfig<SalesTransaction, CreateSaleTransactionPayload>
) => {
  return useMutation({
    mutationFn: (payload: CreateSaleTransactionPayload) =>
      patchSalesTransaction(id, payload),
    ...opts,
  });
};

export const useGetSalesTransactionDetail = <Override = SalesTransaction>(
  opts: SingleUseQueryOption<SalesTransaction, Override>
) => {
  const { apiConfig, id } = opts;
  const queryKey = ['salesTransactionDetail', id] as QueryKey;

  const { data, ...rest } = useQuery({
    queryKey,
    queryFn: ({ signal }) => getSalesTransactionDetail(id, { ...apiConfig, signal }),
    enabled: !!id,
  });

  return { response: data, ...rest };
};

export const useDeleteSalesTransaction = (opts?: MutationConfig<null, string>) => {
  return useMutation({
    mutationFn: (id: string) => deleteSalesTransaction(id),
    ...opts,
  });
};
