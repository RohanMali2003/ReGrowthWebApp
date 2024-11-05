import React from 'react';
import {
  Button,
  ErrorBoundary,
  FormError,
  Icon,
  PageLoader,
  Snackbar,
  SubPanel,
} from 'src/components';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProcedureDetail } from 'src/hooks/useProcedures';
import { viewProceduresBreadCrumbLinks } from '../constants';
import ProcedureBasicInfo from './ProcedureBasicInfo';
import { ERROR_RED } from 'src/constants/colors';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';

const ViewProcedure: React.FC = (): JSX.Element => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const { isFetching, data } = useGetProcedureDetail({
    id,
  });
  const { snackbarAlertState, onDismiss, setSnackbarAlertState } =
    useSnackbarAlert();

  const onEditProcedure = () => {
    setSnackbarAlertState({
      severity: 'success',
      title: 'Button Click',
      message: 'Edit button clicked for procedure',
    });
  };

  return (
    <ErrorBoundary fallbackComponent={FormError}>
      <Snackbar
        open={!!snackbarAlertState.message}
        severity={snackbarAlertState.severity}
        message={snackbarAlertState.message}
        onClose={onDismiss}
      />

      <SubPanel
        pageTitle="PROCEDURE DETAILS"
        breadcrumbLinks={viewProceduresBreadCrumbLinks}
      />
      <PageLoader isLoading={isFetching} Components={{ Loading: 'form' }}>
        <Stack spacing={3} sx={{ marginTop: '60px' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}
            >
              <Typography
                sx={{ fontWeight: '600', fontSize: '26px', lineHeight: '31px' }}
              >
                {data?.patientName}
              </Typography>
            </Box>
            <Box
              sx={{
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}
            >
              <Button
                variant="outlined"
                onClick={onEditProcedure}
                startIcon={<Icon icon="edit" size="15" />}
                sx={{ marginRight: '20px' }}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                onClick={() =>
                  setSnackbarAlertState(
                    {
                      severity: 'error',
                      title: 'Button Click',
                      message: 'Delete button clicked for procedure',
                    }
                  )
                }
                startIcon={<Icon icon="trash" size="15" />}
                sx={{ backgroundColor: ERROR_RED }}
              >
                Delete
              </Button>
            </Box>
          </Box>
          <ProcedureBasicInfo procedureDetails={data} />
          <Box>
            <Button
              variant="outlined"
              startIcon={<Icon icon="arrowLeft" size="15" />}
              sx={{ padding: '20px' }}
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
          </Box>
        </Stack>
      </PageLoader>
    </ErrorBoundary>
  );
};

export default ViewProcedure;