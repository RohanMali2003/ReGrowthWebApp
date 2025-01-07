import React, { PropsWithChildren, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { rolesAllowedRoutes } from 'src/constants/auth';
import { UNAUTHORIZED_PATH } from 'src/constants/paths';
import Layout from 'src/pages/Layout';
import { getAllowedRoutes, getAuthInfo, isRefreshTokenExpired, isUserLoggedIn, refreshAccessToken } from 'src/util/auth';

const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const { accessTokenExpiry } = getAuthInfo();
  const allowedRoutes = isUserLoggedIn() && getAllowedRoutes(rolesAllowedRoutes);

  useEffect(() => {
    if (isUserLoggedIn() && isRefreshTokenExpired()){
      refreshAccessToken();
    }
  }, [location.pathname, accessTokenExpiry]);

  const rootPath = `/${location.pathname.split('/')[1] || ''}`;
  const pathname = `$${location.pathname}${location.search}`;

  const isRouteAllowed = allowedRoutes && Array.from(allowedRoutes).some(route => location.pathname.startsWith(route));


  if (!isUserLoggedIn() || isRefreshTokenExpired()) {
    return <Navigate to="/login" state={{ pathname }}/>;
  } else if (allowedRoutes && !allowedRoutes.has(rootPath)) {
    return <Navigate to={UNAUTHORIZED_PATH} state={{ isAuthorized: false }} />;
  }

  return <Layout>{children || <Outlet />}</Layout>
};

export default ProtectedRoute;