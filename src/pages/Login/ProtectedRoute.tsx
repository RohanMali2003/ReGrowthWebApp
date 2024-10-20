import React, { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';
import Layout from '../Layout';

const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
  // TODO: Add RBAC logic here
  return <Layout>{children ? children : <Outlet />}</Layout>;
};

export default ProtectedRoute;
