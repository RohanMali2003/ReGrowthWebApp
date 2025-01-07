import React from 'react';
import {
  Button,
  ConfirmationModal,
  ErrorBoundary,
  FormError,
  Icon,
  LoadingBackdrop,
  PageLoader,
  Snackbar,
  SubPanel,
} from 'src/components';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useNavigate, useParams } from 'react-router-dom';
import { viewProceduresBreadCrumbLinks } from '../constants';
import { ERROR_RED } from 'src/constants/colors';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';
import { EXTERNAL_PROCEDURE, getEditExternalProcedureRoute } from 'src/constants/paths';
import useDeleteConfirmationModal from 'src/hooks/useDelete';
import { useDeleteExternalProcedure, useGetExternalProcedureDetail } from 'src/hooks/useExternalProcedures';
import ExternalProcedureBasicInfo from './ExternalProceduresBasicInfo';

const ViewExternalProcedure: React.FC = (): JSX.Element => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const { isFetching, response } = useGetExternalProcedureDetail({
    id,
  });
  const { snackbarAlertState, onDismiss, setSnackbarAlertState } =
    useSnackbarAlert();
    
  const onEditExternalProcedure = () => {
    navigate(getEditExternalProcedureRoute(id));
  };

  const { mutate: deleteExternalProcedure, isPending: isDeleteInProgress } =
    useDeleteExternalProcedure({
      onSuccess: () => {
        navigate(EXTERNAL_PROCEDURE, {
          state: {
            alert: {
              severity: 'success',
              title: 'External Procedure Deleted.',
              message: `External Procedure "${deleteConfirmationModalValues?.name}" is deleted successfully.`,
            },
          },
        });
      },
      onError: (err: Error) => {
        setSnackbarAlertState({
          severity: 'error',
          title: 'ERROR.',
          message: err.message,
        });
      },
    });
  const {
    deleteConfirmationModalValues,
    onDeleteConfirm,
    showDeleteConfirmationModal,
    onShowDeleteConfirmationModal,
    onClose,
  } = useDeleteConfirmationModal({ onDelete: deleteExternalProcedure });
  
  return (
    <ErrorBoundary fallbackComponent={FormError}>
      <Snackbar
        open={!!snackbarAlertState.message}
        severity={snackbarAlertState.severity}
        message={snackbarAlertState.message}
        onClose={onDismiss}
      />
      <LoadingBackdrop loading={isDeleteInProgress} />
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
                {response?.doctorName}
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
                onClick={onEditExternalProcedure}
                startIcon={<Icon icon="edit" size="15" />}
                sx={{ marginRight: '20px' }}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                onClick={() =>
                  onShowDeleteConfirmationModal(
                    response?.doctorId.toString() || '',
                    response?.procedureType || '',
                  )
                }
                startIcon={<Icon icon="trash" size="15" />}
                sx={{ backgroundColor: ERROR_RED }}
              >
                Delete
              </Button>
            </Box>
          </Box>
          <ExternalProcedureBasicInfo externalProcedureDetails={response} />
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
          <ConfirmationModal
            onClose={onClose}
            onSubmit={onDeleteConfirm}
            open={showDeleteConfirmationModal}
          />
        </Stack>
      </PageLoader>
    </ErrorBoundary>
  );
};

export default ViewExternalProcedure;