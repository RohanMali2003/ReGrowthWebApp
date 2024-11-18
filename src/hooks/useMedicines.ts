import { QueryKey, useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { MEDICINES } from "src/constants/paths";
import axiosClient from "src/util/axios";

/**
 * API
 */
export const getMedicinesList = (config?: AxiosRequestConfig) =>
  axiosClient
    .get<PaginatedResponse<Medicine>>(MEDICINES, config)
    .then((res) => res.data);

/**
 * HOOKS
 */
export const useGetMedicinesList = <Override = PaginatedResponse<Medicine>>(
  opts?: UseQueryOption<PaginatedResponse<Medicine>, Override>,
) => {
  const { key, useQueryConfig, apiConfig } = opts || {};
  const queryKey = (key || ['medicines', apiConfig.params]) as QueryKey;

  const { data, ...rest } = useQuery<PaginatedResponse<Medicine>>({
    queryKey,
    queryFn: ({ signal }) => getMedicinesList({ ...apiConfig, signal }),
    enabled: !!apiConfig,
    ...useQueryConfig,
  });

  return { response: data, ...rest };
};
