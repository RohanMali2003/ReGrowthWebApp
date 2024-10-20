import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import {
  DASHBOARD_PATH,
  INVENTORY,
  LOGIN,
  MEDICINES,
  PATIENTS,
  PROCEDURES,
} from './constants/paths';
import Login from './pages/Login';
import ProtectedRoute from './pages/Login/ProtectedRoute';
import Patients from './pages/Patients';
import Procedures from './pages/Procedures';
import Medicines from './pages/Medicines';
import Inventory from './pages/Inventory';

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path={LOGIN} element={<Login />} />

    <Route element={<ProtectedRoute />}>
      <Route path={DASHBOARD_PATH} element={<Dashboard />} />
      <Route path={PATIENTS} element={<Patients />} />
      <Route path={PROCEDURES} element={<Procedures />} />
      <Route path={MEDICINES} element={<Medicines />} />
      <Route path={INVENTORY} element={<Inventory />} />
    </Route>
  </Routes>
);

export default AppRoutes;
