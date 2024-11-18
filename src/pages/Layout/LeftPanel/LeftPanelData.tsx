import React from 'react';
import { AiOutlineMedicineBox } from 'react-icons/ai';
import { FiClipboard, FiUsers } from 'react-icons/fi';
import { MdOutlineInventory } from 'react-icons/md';
import { RxDashboard } from 'react-icons/rx';
import {
  DASHBOARD_PATH,
  INVENTORY,
  MEDICINES,
  PATIENTS,
  PROCEDURES,
  USERS,
} from 'src/constants/paths';

export const globalOptions = [
  {
    title: 'Dashboard',
    icon: <RxDashboard size="24px" />,
    route: DASHBOARD_PATH,
  },
  {
    title: 'Patients',
    icon: <FiUsers size="24px" />,
    route: PATIENTS,
  },
  {
    title: 'Procedures',
    icon: <FiClipboard size="24px" />,
    route: PROCEDURES,
  },
  {
    title: 'Medicines',
    icon: <AiOutlineMedicineBox size="24px" />,
    route: MEDICINES,
  },
  {
    title: 'Inventory',
    icon: <MdOutlineInventory size="24px" />,
    route: INVENTORY,
  },
  {
    title: 'Users',
    icon: <FiUsers size="24px" />,
    route: USERS,
  },
];
