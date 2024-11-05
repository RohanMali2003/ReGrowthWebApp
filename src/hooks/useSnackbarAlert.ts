import { useEffect, useState } from 'react';
import {
  Location,
  NavigateFunction,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { AlertColor } from '@mui/material/Alert';

export type SnackbarAlertState = {
  severity: AlertColor;
  title: string;
  message: string | JSX.Element;
};

export type LocationState = {
  alert: SnackbarAlertState;
  clusterName?: string;
  clusterId?: string;
  snapshotLocation?: string;
  subscription?: string;
};

const defaultSnackbarAlertState: SnackbarAlertState = {
  severity: 'error',
  message: '',
  title: '',
};

const navigateTo = (location: Location, navigate: NavigateFunction) => {
  if (location.search) {
    navigate(`${location.pathname}${location.search}`, {
      state: null,
      replace: true,
    });
    return;
  }
  navigate(location.pathname, { state: null, replace: true });
};

export const useSnackbarAlert = (initialState?: SnackbarAlertState) => {
  const location = useLocation();
  const [snackbarAlertState, setSnackbarAlertState] =
    useState<SnackbarAlertState>(initialState ?? defaultSnackbarAlertState);
  const navigate = useNavigate();
  const { alert } = (location?.state as LocationState) || {};

  useEffect(() => {
    if (alert) {
      setSnackbarAlertState(alert);
      navigateTo(location, navigate);
    }
  }, []);

  const onDismiss = () => {
    setSnackbarAlertState((prevState) => ({
      ...defaultSnackbarAlertState,
      severity: prevState.severity,
    }));
    navigateTo(location, navigate);
  };

  return {
    snackbarAlertState,
    setSnackbarAlertState,
    onDismiss,
  };
};

export default useSnackbarAlert;
