import axios from 'axios';

export const initAxiosClient = (baseURL?: string) => {
  const axiosClient = axios.create({
    ...(baseURL ? { baseURL } : {}),
  });

  return axiosClient;
};

const axiosClient = initAxiosClient(import.meta.env.VITE_API_BASE_URL);

export default axiosClient;
