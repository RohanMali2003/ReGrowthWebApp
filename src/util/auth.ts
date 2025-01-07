import { jwtDecode } from "jwt-decode";
import axiosClient from "./axios";
import { REFRESH_TOKEN_ROUTE } from "src/api/login/routes";
import { AxiosRequestConfig } from "axios";
import { LOGIN } from "src/constants/paths";

interface TokenExpiry {
  exp: number;
}

export const setNewToken = (accessToken: string, refreshToken = '') => {
  // Check if tokens are valid
  if (!accessToken || !refreshToken) {
    console.error("Invalid tokens:", { accessToken, refreshToken });
    return;
  }

  try {
    const accessTokenInfo: TokenExpiry = jwtDecode(accessToken);
    const refreshTokenInfo: TokenExpiry = jwtDecode(refreshToken);

    // Set tokens in localStorage
    localStorage.setItem('ACCESS_TOKEN', accessToken);
    localStorage.setItem('ACCESS_TOKEN_EXPIRY', `${accessTokenInfo.exp * 1000}`);
    localStorage.setItem('IS_REFRESH_TOKEN_LOADING', 'false');
    localStorage.setItem('REFRESH_TOKEN', refreshToken);
    localStorage.setItem('REFRESH_TOKEN_EXPIRY', `${refreshTokenInfo.exp * 1000}`);

    // Check if access token is expired
    const currentDate = Date.now();
    if (currentDate > accessTokenInfo.exp * 1000) {
      console.log("Access token is expired. Logging out...");
      Logout();
    }

  } catch (error) {
    console.error("Error decoding tokens:", error);
  }
};

export const isRefreshTokenExpired = () => { 
  const { refreshTokenExpiry } = getAuthInfo();
  const currentDate = Date.now();

  return refreshTokenExpiry && currentDate > refreshTokenExpiry;
};

const setIsRefreshTokenLoading = (isLoading: boolean) => {
  localStorage.setItem('IS_REFRESH_TOKEN_LOADING', JSON.stringify(isLoading));
};

export const refreshAccessToken = async (config?: AxiosRequestConfig) => {
  const { refreshToken, isRefreshTokenLoading } = getAuthInfo();

  // Check if the refreshToken is present
  if (!refreshToken) {
    console.error("No refresh token available");
    return;
  }

  const payload: CreateRefreshTokenPayload = {
    refreshToken: refreshToken ?? '',
  };

  if (isRefreshTokenLoading) {
    return;
  }
  setIsRefreshTokenLoading(true);

  try {
    console.log("Sending refresh token:", payload); // Log the payload

    const response = await axiosClient.post<CreateLoginResponse>(REFRESH_TOKEN_ROUTE, 
      payload, config);

    console.log("Received response:", response.data); // Log the response data

    const token = response.data.jwtToken;
    setNewToken(token);
    setIsRefreshTokenLoading(false);
    return response.data;

  } catch (error) {
    setIsRefreshTokenLoading(false);
    console.error("Error refreshing token:", error); // Log error
    // If refreshing the token fails, log the user out
    Logout();
    throw new Error('Refresh token failed: ' + error);
  }
};

export const setAuthInfo = (loggedState: CreateLoginResponse) => {
  setNewToken(loggedState.jwtToken, loggedState.refreshToken);
  localStorage.setItem('IS_LOGGED_IN', loggedState.LoggedInState.toString());
  localStorage.setItem('USER_NAME', JSON.stringify(loggedState.username));
  localStorage.setItem('ROLE', JSON.stringify(loggedState.role));
};

export const getAuthInfo = () => {
  const userInfo = localStorage.getItem('USER_NAME');
  const role = localStorage.getItem('ROLE');
  const isRefreshTokenLoading = localStorage.getItem('IS_REFRESH_TOKEN_LOADING');
  const accessTokenExpiry = localStorage.getItem('ACCESS_TOKEN_EXPIRY');
  const refreshTokenExpiry = localStorage.getItem('REFRESH_TOKEN_EXPIRY');

  console.log("LocalStorage state:", {
    userInfo,
    role,
    isRefreshTokenLoading,
    accessTokenExpiry,
    refreshTokenExpiry,
    accessToken: localStorage.getItem('ACCESS_TOKEN'),
    refreshToken: localStorage.getItem('REFRESH_TOKEN'),
  });

  return { 
    loggedState: localStorage.getItem('IS_LOGGED_IN'),
    username: localStorage.getItem('USER_NAME'),
    role: role ? JSON.parse(role) : null,
    accessToken: localStorage.getItem('ACCESS_TOKEN'),
    ...(accessTokenExpiry ? { accessTokenExpiry: Number(accessTokenExpiry) } : {}),
    ...(refreshTokenExpiry ? { refreshTokenExpiry: Number(refreshTokenExpiry) } : {}),
    refreshToken: localStorage.getItem('REFRESH_TOKEN'),
    ...(isRefreshTokenLoading ? { isRefreshTokenLoading: JSON.parse(isRefreshTokenLoading) } : {}),
    ...(userInfo ? { userInfo: JSON.parse(userInfo) } : {}),
  };
};

export const isUserLoggedIn = () => !!localStorage.getItem('ACCESS_TOKEN');

export const getAllowedRoutes = (allowedPaths: { [key: string]: string[] }) => {
  const role = localStorage.getItem('ROLE');

  if (role) {
    const parsedRole = JSON.parse(role);
    if (allowedPaths[parsedRole]) {
      return new Set(allowedPaths[parsedRole]);
    }
  }
};

// Logout function clears localStorage and redirects to login page
export const Logout = async () => {
  localStorage.clear();
  window.location.replace(LOGIN);
};













// import { jwtDecode } from "jwt-decode";

// interface TokenExpiry {
//   exp: number;
// }
// import axiosClient from "./axios";
// import { REFRESH_TOKEN_ROUTE } from "src/api/login/routes";
// import { AxiosRequestConfig } from "axios";
// import { LOGIN } from "src/constants/paths";


// export const setNewToken = (accessToken: string, refreshToken = '') => {
//   // Check if tokens are valid
//   if (!accessToken || !refreshToken) {
//     console.error("Invalid tokens:", { accessToken, refreshToken });
//     return;
//   }

//   try {
//     const accessTokenInfo: TokenExpiry = jwtDecode(accessToken);
//     const refreshTokenInfo: TokenExpiry = jwtDecode(refreshToken);

//     localStorage.setItem('ACCESS_TOKEN', accessToken);
//     localStorage.setItem('ACCESS_TOKEN_EXPIRY', `${accessTokenInfo.exp * 1000}`);
//     localStorage.setItem('IS_REFRESH_TOKEN_LOADING', 'false');
//     localStorage.setItem('REFRESH_TOKEN', refreshToken);
//     localStorage.setItem('REFRESH_TOKEN_EXPIRY', `${refreshTokenInfo.exp * 1000}`);
//   } catch (error) {
//     console.error("Error decoding tokens:", error);
//   }
// }


// export const isRefreshTokenExpired = () => { 
//   const { refreshTokenExpiry } = getAuthInfo();
//   const currentDate = Date.now();

//   return refreshTokenExpiry && currentDate > refreshTokenExpiry;
// }

// const setIsRefreshTokenLoading = (isLoading: boolean) => {
//   localStorage.setItem('IS_REFRESH_TOKEN_LOADING', JSON.stringify(isLoading));
// };

// export const refreshAccessToken = async (config?: AxiosRequestConfig) => {
//   const { refreshToken, isRefreshTokenLoading } = getAuthInfo();

//   // Check if the refreshToken is present
//   if (!refreshToken) {
//     console.error("No refresh token available");
//     return;
//   }

//   const payload: CreateRefreshTokenPayload = {
//     refreshToken: refreshToken ?? '',
//   };

//   if (isRefreshTokenLoading) {
//     return;
//   }
//   setIsRefreshTokenLoading(true);

//   try {
//     console.log("Sending refresh token:", payload); // Log the payload

//     const response = await axiosClient.post<CreateLoginResponse>(REFRESH_TOKEN_ROUTE, 
//       payload, config);

//     console.log("Received response:", response.data); // Log the response data

//     const token = response.data.jwtToken;
//     setNewToken(token);
//     setIsRefreshTokenLoading(false);
//     return response.data;

//   } catch (error) {
//     setIsRefreshTokenLoading(false);
//     console.error("Error refreshing token:", error); // Log error
//     throw new Error('Refresh token failed: ' + error);
//   }
// }


// export const setAuthInfo = (loggedState: CreateLoginResponse) => {
//   setNewToken(loggedState.jwtToken, 
//     loggedState.refreshToken);
//   localStorage.setItem('IS_LOGGED_IN', loggedState.LoggedInState.toString());
//   localStorage.setItem('USER_NAME', JSON.stringify(loggedState.username));
//   localStorage.setItem('ROLE', JSON.stringify(loggedState.role));
// }

// export const getAuthInfo = () => {
//   const userInfo = localStorage.getItem('USER_NAME');
//   const role = localStorage.getItem('ROLE');
//   const isRefreshTokenLoading = localStorage.getItem('IS_REFRESH_TOKEN_LOADING');
//   const accessTokenExpiry = localStorage.getItem('ACCESS_TOKEN_EXPIRY');
//   const refreshTokenExpiry = localStorage.getItem('REFRESH_TOKEN_EXPIRY');

//   console.log("LocalStorage state:", {
//     userInfo,
//     role,
//     isRefreshTokenLoading,
//     accessTokenExpiry,
//     refreshTokenExpiry,
//     accessToken: localStorage.getItem('ACCESS_TOKEN'),
//     refreshToken: localStorage.getItem('REFRESH_TOKEN'),
//   });

//   return { 
//     loggedState: localStorage.getItem('IS_LOGGED_IN'),
//     username: localStorage.getItem('USER_NAME'),
//     role: role ? JSON.parse(role) : null,
//     accessToken: localStorage.getItem('ACCESS_TOKEN'),
//     ...(accessTokenExpiry ? { accessTokenExpiry: Number(accessTokenExpiry) } : {}),
//     ...(refreshTokenExpiry ? { refreshTokenExpiry: Number(refreshTokenExpiry) } : {}),
//     refreshToken: localStorage.getItem('REFRESH_TOKEN'),
//     ...(isRefreshTokenLoading ? { isRefreshTokenLoading: JSON.parse(isRefreshTokenLoading) } : {}),
//     ...(userInfo ? { userInfo: JSON.parse(userInfo) } : {}),
//   }
// }


// export const isUserLoggedIn = () => !!localStorage.getItem('ACCESS_TOKEN');

// export const getAllowedRoutes = (allowedPaths: { [key: string]: string[] }) => {
//   const role = localStorage.getItem('ROLE');

//   if (role) {
//     const parsedRole = JSON.parse(role);
//     if (allowedPaths[parsedRole]) {
//       return new Set(allowedPaths[parsedRole]);
//     }
//   }
// };

// export const Logout = async () => {
//   localStorage.clear();
//   window.location.replace(LOGIN);
// }