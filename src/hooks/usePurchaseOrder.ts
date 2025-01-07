import { QueryKey, useMutation, useQuery } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import {
  deletePurchaseOrderWithIdRoute,
  editPurchaseOrderWithIdRoute,
  getPurchaseOrderWithIdRoute,
  getMedicinesListByPurchaseOrderIdRoute,
  NEW_PURCHASE_ROUTE,
  PURCHASE_LIST,
} from 'src/api/puchaseOrders/routes';
import axiosClient from 'src/util/axios';

/**
 * API 
 */
export const getPurchaseOrderList = (config?: AxiosRequestConfig) =>
  axiosClient
    .get<PaginatedResponse<PurchaseOrder>>(PURCHASE_LIST, config)
    .then((res) => res.data);

export const getMedicinesListByPurchaseOrderId = (id: string, config?: AxiosRequestConfig) =>
  axiosClient
    .get<purchaseTransaction[]>(getMedicinesListByPurchaseOrderIdRoute(id), config)
    .then((res) => ({
      content: res.data,
      total: res.data.length,
      page: 1,
      pageSize: res.data.length,
    }));

export const createPurchaseOrder = (
  payload: CreatePurchasePayload,
  config?: AxiosRequestConfig,
) => axiosClient.post<PurchaseOrder>(NEW_PURCHASE_ROUTE, payload, config).then((res) => res.data);

export const getPurchaseOrderDetail = (id: string, config?: AxiosRequestConfig) =>
  axiosClient
    .get<PurchaseOrder>(getPurchaseOrderWithIdRoute(id), config)
    .then((res) => res.data);

export const patchPurchaseOrder = (id: string, payload: CreatePurchasePayload) =>
  axiosClient.patch<PurchaseOrder, CreatePurchasePayload>(
    editPurchaseOrderWithIdRoute(id),
    payload,
  );

export const deletePurchaseOrder = (id: string) =>
  axiosClient.delete<null>(deletePurchaseOrderWithIdRoute(id));

/**
 * HOOKS
 */
export const useGetPurchaseOrderList = <Override = PaginatedResponse<PurchaseOrder>>(
  opts?: UseQueryOption<PaginatedResponse<PurchaseOrder>, Override>,
) => {
  const { key, useQueryConfig, apiConfig } = opts || {};
  const queryKey = (key || ['purchaseOrders', apiConfig.params]) as QueryKey;

  const { data, ...rest } = useQuery<PaginatedResponse<PurchaseOrder>>({
    queryKey,
    queryFn: ({ signal }) => getPurchaseOrderList({ ...apiConfig, signal }),
    enabled: !!apiConfig,
    ...useQueryConfig,
  });

  return { response: data, ...rest };
};

export const useGetMedicinesListByPurchaseOrderId = <Override = PaginatedResponse<purchaseTransaction>>(
  id: string,
  opts?: UseQueryOption<PaginatedResponse<purchaseTransaction>, Override>,
) => {
  const { key, useQueryConfig, apiConfig } = opts || {};
  const queryKey = (key || ['purchaseOrderMedicines', id]) as QueryKey;

  const { data, ...rest } = useQuery<PaginatedResponse<purchaseTransaction>>({
    queryKey,
    queryFn: ({ signal }) => getMedicinesListByPurchaseOrderId(id, { ...apiConfig, signal }),
    enabled: !!apiConfig,
    ...useQueryConfig,
  });

  return { response: data, ...rest };
};

export const useCreatePurchaseOrder = (
  opts?: MutationConfig<PurchaseOrder, CreatePurchasePayload>,
) => {
  return useMutation({
    mutationFn: (payload: CreatePurchasePayload) => createPurchaseOrder(payload),
    ...opts,
  });
};

export const useGetPurchaseOrderDetail = <Override = PurchaseOrder>(
  opts: SingleUseQueryOption<PurchaseOrder, Override>,
) => {
  const { apiConfig, id } = opts;
  const queryKey = ['purchaseOrderDetail', id] as QueryKey;
  return useQuery({
    queryKey,
    queryFn: ({ signal }) => getPurchaseOrderDetail(id, { ...apiConfig, signal }),
    enabled: !!id,
  });
};

export const usePatchPurchaseOrder = (
  id: string,
  opts?: MutationConfig<PurchaseOrder, CreatePurchasePayload>,
) => {
  return useMutation({
    mutationFn: (payload: CreatePurchasePayload) => {
      return patchPurchaseOrder(id, payload);
    },
    ...opts,
  });
};

export const useDeletePurchaseOrder = (opts?: MutationConfig<null, string>) => {
  return useMutation({
    mutationFn: (id: string) => deletePurchaseOrder(id),
    ...opts,
  });
};
