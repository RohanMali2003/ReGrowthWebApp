import React from 'react';
import { FiHome } from 'react-icons/fi';
import {
  DASHBOARD_PATH,
  INVENTORY,
  MEDICINES,
  PATIENTS,
  PROCEDURES,
} from 'src/constants/paths';

export const globalOptions = [
  {
    title: 'Dashboard',
    icon: <FiHome size="24px" />,
    route: DASHBOARD_PATH,
  },
  {
    title: 'Patients',
    icon: <FiHome size="24px" />,
    route: PATIENTS,
  },
  {
    title: 'Procedures',
    icon: <FiHome size="24px" />,
    route: PROCEDURES,
  },
  {
    title: 'Medicines',
    icon: <FiHome size="24px" />,
    route: MEDICINES,
  },
  {
    title: 'Inventory',
    icon: <FiHome size="24px" />,
    route: INVENTORY,
  },
];
