import React, { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';
import Layout from 'src/pages/Layout';

const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
  // TODO: Add RBAC logic here
  return <Layout>{children ? children : <Outlet />}</Layout>;
};

export default ProtectedRoute;
