import { QueryKey, useMutation, useQuery } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import { getUserWithIdRoute, USERS_ROUTE } from 'src/api/users/routes';
import axiosClient from 'src/util/axios';

/**
 * API
 */
export const getUsersList = (config?: AxiosRequestConfig) =>
  axiosClient
    .get<PaginatedResponse<User[]>>(USERS_ROUTE, config)
    .then((res) => res.data);

export const deleteUser = (id: string) =>
  axiosClient.delete<null>(getUserWithIdRoute(id));

export const createUser = (
  payload: CreateUserPayload,
  config?: AxiosRequestConfig,
) => axiosClient.post<User>(USERS_ROUTE, payload, config);

export const patchUser = (id: string, payload: CreateUserPayload) =>
  axiosClient.patch<User, CreateUserPayload>(
    getUserWithIdRoute(id),
    payload,
  );

export const getUserDetail = (id: string, config?: AxiosRequestConfig) =>
  axiosClient
    .get<User>(getUserWithIdRoute(id), config)
    .then((res) => res.data);

/**
 * HOOKS
 */
export const useGetUsersList = <Override = PaginatedResponse<User>>(
  opts?: UseQueryOption<PaginatedResponse<User>, Override>,
) => {
  const { key, useQueryConfig, apiConfig } = opts || {};
  const queryKey = (key || ['users', apiConfig.params]) as QueryKey;

  const { data, ...rest } = useQuery<PaginatedResponse<User>>({
    queryKey,
    queryFn: ({ signal }) => getUsersList({ ...apiConfig, signal }),
    enabled: !!apiConfig,
    ...useQueryConfig,
  });

  return { response: data, ...rest };
};

export const useGetUserDetail = <Override = User>(
  opts: SingleUseQueryOption<User, Override>,
) => {
  const { apiConfig, id } = opts;
  const queryKey = ['registry', id] as QueryKey;
  return useQuery({
    queryKey,
    queryFn: ({ signal }) => getUserDetail(id, { ...apiConfig, signal }),
    enabled: !!id,
  });
};

export const useDeleteUser = (opts?: MutationConfig<null, string>) => {
  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    ...opts,
  });
};

export const useCreateUser = (
  opts?: MutationConfig<User, CreateUserPayload>,
) => {
  return useMutation({
    mutationFn: (payload: CreateUserPayload) => createUser(payload),
    ...opts,
  });
};

export const usePatchUser = (
  id: string,
  opts?: MutationConfig<User, CreateUserPayload>,
) => {
  return useMutation({
    mutationFn: (payload: CreateUserPayload) => {
      return patchUser(id, payload);
    },
    ...opts,
  });
};