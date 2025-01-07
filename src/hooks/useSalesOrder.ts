import { QueryKey, useMutation, useQuery } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import {
  SALES_LIST,
  NEW_SALE_ROUTE,
  getSaleOrderWithIdRoute,
  editSaleOrderWithIdRoute,
  deleteSaleOrderWithIdRoute,
  getMedicinesListBySaleOrderIdRoute,
} from 'src/api/salesOrder/routes';
import axiosClient from 'src/util/axios';

/**
 * API
 
 

*/
export const getSalesList = (config?: AxiosRequestConfig) =>
  axiosClient
    .get<PaginatedResponse<SaleOrder>>(SALES_LIST, config)
    .then((res) => res.data);

export const getMedicinesListBySaleOrderId = (id: string, config?: AxiosRequestConfig) =>
  axiosClient
    .get<SalesTransaction[]>(getMedicinesListBySaleOrderIdRoute(id), config)
    .then((res) => ({
      content: res.data,
      total: res.data.length,
      page: 1,
      pageSize: res.data.length,
    }));

export const createSaleOrder = (
  payload: CreateSalePayload,
  config?: AxiosRequestConfig,
) => axiosClient.post<SaleOrder>(NEW_SALE_ROUTE, payload, config)
.then((res) => res.data);

export const getSaleOrderDetail = (id: string, config?: AxiosRequestConfig) =>
  axiosClient
    .get<SaleOrder>(getSaleOrderWithIdRoute(id), config)
    .then((res) => res.data);

export const patchSaleOrder = (id: string, payload: CreateSalePayload) =>
  axiosClient.patch<SaleOrder, CreateSalePayload>(
    editSaleOrderWithIdRoute(id),
    payload,
  );

export const deleteSaleOrder = (id: string) =>
  axiosClient.delete<null>(deleteSaleOrderWithIdRoute(id));

/**
 * HOOKS
 */
export const useGetSalesList = <Override = PaginatedResponse<SaleOrder>>(
  opts?: UseQueryOption<PaginatedResponse<SaleOrder>, Override>,
) => {
  const { key, useQueryConfig, apiConfig } = opts || {};
  const queryKey = (key || ['salesOrders', apiConfig.params]) as QueryKey;

  const { data, ...rest } = useQuery<PaginatedResponse<SaleOrder>>({
    queryKey,
    queryFn: ({ signal }) => getSalesList({ ...apiConfig, signal }),
    enabled: !!apiConfig,
    ...useQueryConfig,
  });

  return { response: data, ...rest };
};

export const useGetMedicinesListBySaleOrderId = <Override = PaginatedResponse<SalesTransaction>>(
  id: string,
  opts?: UseQueryOption<PaginatedResponse<SalesTransaction>, Override>,
) => {
  const { key, useQueryConfig, apiConfig } = opts || {};
  const queryKey = (key || ['saleOrderMedicines', id]) as QueryKey;

  const { data, ...rest } = useQuery<PaginatedResponse<SalesTransaction>>({
    queryKey,
    queryFn: ({ signal }) => getMedicinesListBySaleOrderId(id, { ...apiConfig, signal }),
    enabled: !!apiConfig,
    ...useQueryConfig,
  });

  return { response: data, ...rest };
};

export const useCreateSaleOrder = (
  opts?: MutationConfig<SaleOrder, CreateSalePayload>,
) => {
  return useMutation<SaleOrder, Error, CreateSalePayload>({
    mutationFn: (payload: CreateSalePayload) => createSaleOrder(payload),
    ...opts,
  });
};



export const useGetSaleOrderDetail = <Override = SaleOrder>(
  opts: SingleUseQueryOption<SaleOrder, Override>,
) => {
  const { apiConfig, id } = opts;
  const queryKey = ['saleOrderDetail', id] as QueryKey;
  return useQuery({
    queryKey,
    queryFn: ({ signal }) => getSaleOrderDetail(id, { ...apiConfig, signal }),
    enabled: !!id,
  });
};

export const usePatchSaleOrder = (
  id: string,
  opts?: MutationConfig<SaleOrder, CreateSalePayload>,
) => {
  return useMutation({
    mutationFn: (payload: CreateSalePayload) => {
      return patchSaleOrder(id, payload);
    },
    ...opts,
  });
};

export const useDeleteSaleOrder = (opts?: MutationConfig<null, string>) => {
  return useMutation({
    mutationFn: (id: string) => deleteSaleOrder(id),
    ...opts,
  });
};
