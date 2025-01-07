import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { LOGIN_ROUTE } from "src/api/login/routes";
import { setAuthInfo } from "src/util/auth";
import axiosClient from "src/util/axios";

/**
 * API
 */

export const loginUser = async (payload: CreateLoginPayload, config?: AxiosRequestConfig) => {
  try {
    const response = await axiosClient.post<CreateLoginResponse>(LOGIN_ROUTE, payload, config);
    const loggedInState: CreateLoginResponse = {
      jwtToken: response.data.jwtToken,
      refreshToken: response.data.refreshToken,
      username: response.data.username,
      role: response.data.role,
      LoggedInState: true,
    };
    setAuthInfo(loggedInState);
  } catch (error) {
      throw new Error('Login failed: ' + error);
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