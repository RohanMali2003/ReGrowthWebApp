import { QueryKey, useQuery, useMutation } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import {
  PURCHASE_TRANSACTION_LIST,
  NEW_TRANSACTION_ROUTE,
  getPurchaseTransactionWithIdRoute,
  editPurchaseTransactionWithIdRoute,
  deletePurchaseTransactionWithIdRoute,
  getAvailableMedicinesListByMedicineIdRoute
} from 'src/api/purchaseTransactions/routes';
import axiosClient from 'src/util/axios';

/**
 * API
 */
export const getPurchaseTransactionList = (config?: AxiosRequestConfig) =>
  axiosClient
    .get<purchaseTransaction[]>(PURCHASE_TRANSACTION_LIST, config)
    .then((res) => ({
      content: res.data,
      total: res.data.length,
      page: 1,
      pageSize: res.data.length,
    }));

    export const getAvailableMedicinesListByMedicineId = (id: string, config?: AxiosRequestConfig) =>
      axiosClient
        .get<purchaseTransaction[]>(getAvailableMedicinesListByMedicineIdRoute(id), config)
        .then((res) => ({
          content: res.data,
          total: res.data.length,
          page: 1,
          pageSize: res.data.length,
        }));    

export const createPurchaseTransaction = (
  payload: CreatePuchaseTransactionPayload,
  config?: AxiosRequestConfig
) => axiosClient.post<purchaseTransaction>(NEW_TRANSACTION_ROUTE, payload, config).then((res) => res.data);

export const patchPurchaseTransaction = (id: string, payload: CreatePuchaseTransactionPayload) =>
  axiosClient.patch<purchaseTransaction>(
    editPurchaseTransactionWithIdRoute(id),
    payload
  ).then((res) => res.data);

export const getPurchaseTransactionDetail = (id: string, config?: AxiosRequestConfig) =>
  axiosClient
    .get<purchaseTransaction>(getPurchaseTransactionWithIdRoute(id), config)
    .then((res) => res.data);

export const deletePurchaseTransaction = (id: string) =>
  axiosClient.delete<null>(deletePurchaseTransactionWithIdRoute(id));

/**
 * HOOKS
 */
export const useGetPurchaseTransactionList = <
  Override = PaginatedResponse<purchaseTransaction>
>(
  opts?: UseQueryOption<PaginatedResponse<purchaseTransaction>, Override>
) => {
  const { key, useQueryConfig, apiConfig } = opts || {};
  const queryKey = (key || ['purchaseTransactions', apiConfig?.params]) as QueryKey;

  const { data, ...rest } = useQuery<PaginatedResponse<purchaseTransaction>>({
    queryKey,
    queryFn: ({ signal }) => getPurchaseTransactionList({ ...apiConfig, signal }),
    enabled: !!apiConfig,
    ...useQueryConfig,
  });

  return { response: data, ...rest };
};

export const useGetAvailableMedicinesListByMedicineId = <Override = PaginatedResponse<purchaseTransaction>>(
  id: string,
  opts?: UseQueryOption<PaginatedResponse<purchaseTransaction>, Override>,
) => {
  const { key, useQueryConfig, apiConfig } = opts || {};
  const queryKey = (key || ['purchaseOrderMedicines', id]) as QueryKey;

  const { data, ...rest } = useQuery<PaginatedResponse<purchaseTransaction>>({
    queryKey,
    queryFn: ({ signal }) => getAvailableMedicinesListByMedicineId(id, { ...apiConfig, signal }),
    enabled: !!apiConfig,
    ...useQueryConfig,
  });

  return { response: data, ...rest };
};

export const useCreatePurchaseTransaction = (
  opts?: MutationConfig<purchaseTransaction, CreatePuchaseTransactionPayload>
) => {
  return useMutation({
    mutationFn: (payload: CreatePuchaseTransactionPayload) =>
      createPurchaseTransaction(payload),
    ...opts,
  });
};

export const usePatchPurchaseTransaction = (
  id: string,
  opts?: MutationConfig<purchaseTransaction, CreatePuchaseTransactionPayload>
) => {
  return useMutation({
    mutationFn: (payload: CreatePuchaseTransactionPayload) =>
      patchPurchaseTransaction(id, payload),
    ...opts,
  });
};

export const useGetPurchaseTransactionDetail = <Override = purchaseTransaction>(
  opts: SingleUseQueryOption<purchaseTransaction, Override>
) => {
  const { apiConfig, id } = opts;
  const queryKey = ['purchaseTransactionDetail', id] as QueryKey;

  const { data, ...rest } = useQuery({
    queryKey,
    queryFn: ({ signal }) => getPurchaseTransactionDetail(id, { ...apiConfig, signal }),
    enabled: !!id,
  });

  return { response: data, ...rest };
};

export const useDeletePurchaseTransaction = (opts?: MutationConfig<null, string>) => {
  return useMutation({
    mutationFn: (id: string) => deletePurchaseTransaction(id),
    ...opts,
  });
};
