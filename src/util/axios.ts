import axios from 'axios';
import { getAuthInfo, refreshAccessToken } from './auth';
import { LOGIN } from 'src/constants/paths';
import { LOGIN_ROUTE } from 'src/api/login/routes';

export const initAxiosClient = (baseURL?: string) => {
  const axiosClient = axios.create({
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
    },
    ...(baseURL ? { baseURL } : {}),
  });
  return axiosClient;
};

const axiosClient = initAxiosClient(import.meta.env.VITE_API_BASE_URL);

// Add Authorization dynamically
axiosClient.interceptors.request.use(async (config) => {
  const authInfo = getAuthInfo();
  const currentDate = Date.now();
  const isInLogin = window.location.pathname === LOGIN;

  if (
    isInLogin &&
    config.url !== LOGIN_ROUTE &&
    (!authInfo?.refreshToken || !authInfo?.accessToken || 
    (authInfo.refreshTokenExpiry && currentDate >= authInfo.refreshTokenExpiry))
  ) {
    window.location.replace(LOGIN); // Redirect to login if no valid tokens
    return config;
  }

  if (config.url !== LOGIN_ROUTE) {
    // Check if accessToken is expired
    if (authInfo.accessToken && authInfo.accessTokenExpiry && currentDate >= authInfo.accessTokenExpiry) {
      try {
        const result = await refreshAccessToken(); // Try to refresh the token
        if (result?.jwtToken) {
          config.headers.Authorization = `Bearer ${result.jwtToken}`;
        } else {
          window.location.replace(LOGIN); // Redirect to login if token refresh fails
        }
      } catch (error) {
        console.error('Error refreshing token:', error);
        window.location.replace(LOGIN); // Redirect to login on error
      }
    } else {
      config.headers.Authorization = `Bearer ${authInfo?.accessToken}`; // Use the existing access token
    }
  }

  return config;
});

export default axiosClient;




// import axios from 'axios';
// import { getAuthInfo, refreshAccessToken } from './auth';
// import { LOGIN } from 'src/constants/paths';
// import { LOGIN_ROUTE } from 'src/api/login/routes';

// export const initAxiosClient = (baseURL?: string) => {
//   const axiosClient = axios.create({
//     headers: {
//       'Accept': 'application/json, text/plain, */*',
//       'Cache-Control': 'no-cache',
//       'Pragma': 'no-cache',
//     },
//     ...(baseURL ? { baseURL } : {}),
//   });
//   return axiosClient;
// };

// const axiosClient = initAxiosClient(import.meta.env.VITE_API_BASE_URL);

// // Add Authorization dynamically
// axiosClient.interceptors.request.use(async (config) => {

//   const authInfo = getAuthInfo();
//   const currentDate = Date.now();
//   const isInLogin = window.location.pathname === LOGIN;

//   if ( isInLogin &&
//         config.url !== LOGIN_ROUTE &&
//         (!authInfo?.refreshToken || 
//           !authInfo?.accessToken || 
//           (authInfo.refreshTokenExpiry &&
//             currentDate >= authInfo.refreshTokenExpiry)
//           ) 
//       ) {
//         window.location.replace(LOGIN);
//         return config;
//       }

//   if (config.url !== LOGIN_ROUTE) {
//     config.headers.Authorization = `Bearer ${authInfo?.accessToken}`;
//   }
//   //config.headers.Authorization = `Bearer ${authInfo?.accessToken}`;

//   if(
//     authInfo.accessToken &&
//     authInfo.accessTokenExpiry &&
//     currentDate >= authInfo.accessTokenExpiry
//   ) {
//     const result = await refreshAccessToken();
//     config.headers.Authorization = `Bearer ${result?.jwtToken}`;
//   }
  

//   return config;
// });

// export default axiosClient;