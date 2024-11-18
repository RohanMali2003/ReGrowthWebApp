import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { LOGIN_ROUTE } from "src/api/login/routes";
import axiosClient from "src/util/axios";

/**
 * API
 */

export const loginUser = async (payload: CreateLoginPayload, config?: AxiosRequestConfig, ) => {
  try {
    const response = await axiosClient.post<Login>(LOGIN_ROUTE, payload, config);
    const token = response.data.jwtToken; 
    if (token) {
      localStorage.setItem('jwtToken', token); // Store the token in localStorage
    }
    return response.data;
  } catch (error) {
      throw new Error('Login failed'+ error);
  }
};

export const useLoginUser = (
  opts?: MutationConfig<Login, CreateLoginPayload>,
) => {

  return useMutation({
    mutationFn: (payload: CreateLoginPayload) => loginUser(payload),
    ...opts,
  });
};
