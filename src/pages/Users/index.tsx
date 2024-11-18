import React, { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {
  FiltersState,
  SubPanel,
  PageLoader,
  Table,
  TableContainer,
  Snackbar,
  LoadingBackdrop,
  ConfirmationModal,
  Actions,
} from 'src/components';
import { listUsersBreadcrumbLinks, usersTableColumns } from './constants';
import { usePagination } from 'src/hooks/usePagination';
import { useDebounce } from '@uidotdev/usehooks';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';
import { useDeleteUser, useGetUsersList } from 'src/hooks/useUser';
import useDeleteConfirmationModal from 'src/hooks/useDelete';
import { getEditUserRoute, NEW_USER_PATH } from 'src/constants/paths';
import { useNavigate } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';

const Users: React.FC = (): React.ReactElement => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FiltersState>();
  const debouncedSearchQuery = useDebounce(filters?.searchQuery, 500);

  const { snackbarAlertState, onDismiss, setSnackbarAlertState } =
    useSnackbarAlert();

  const { pageNumber, changePageNumber } = usePagination();
  const { response, isFetching, isError, refetch } = useGetUsersList({
    apiConfig: {
      params: {
        _page: pageNumber,
        firstName: debouncedSearchQuery,
      },
    },
  });

  const { mutate: deleteUser, isPending: isDeleteInProgress } =
    useDeleteUser({
      onSuccess: () => {
        setSnackbarAlertState({
          severity: 'success',
          title: 'user Deleted.',
          message: `User "${deleteConfirmationModalValues?.name}" is deleted successfully.`,
        });

        refetch();
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
  } = useDeleteConfirmationModal({ onDelete: deleteUser });  

  const noData = !response?.data?.length;

  const usersTableColumnsWithActions = useMemo(
    () => [
      {
        id: 'avatar',
        cell: () => {
          return (
            <FiUser size="20px" />
          );
        },
      },
      ...usersTableColumns,
      {
        id: 'actions',
        cell: ({ row }) => {
          const userValues = row.original;

          return (
            <Actions
              onEditClick={() => {
                navigate(getEditUserRoute(userValues.id));
              }}
              onDeleteClick={() => {
                onShowDeleteConfirmationModal(
                  userValues.id,
                  userValues.username,
                );
              }}
            />
          );
        },
      },
    ],
    [],
  );

  return (
    <>
    <LoadingBackdrop loading={!!isDeleteInProgress} />
      <Snackbar
        open={!!snackbarAlertState.message}
        severity={snackbarAlertState.severity}
        message={snackbarAlertState.message}
        onClose={onDismiss}
      />
      <Stack spacing={2}>
        <SubPanel
          pageTitle="USERS"
          breadcrumbLinks={listUsersBreadcrumbLinks}
          rightSideButtonText="New User"
          rightSideButtonClickEvent={() => {
            navigate(NEW_USER_PATH);
          }}
        />
        <TableContainer
          onFiltersChange={(filters) => {
            setFilters(filters);
          }}
          placeholder="Search By User Name"
        >
          {({ showFilters }) => (
            <Box>
              <PageLoader
                isLoading={isFetching}
                isEmpty={(noData && !isError) || (noData && showFilters)}
                emptyMessage="No users found"
                Components={{ Loading: 'table' }}
              >
                <Table
                  columns={usersTableColumnsWithActions}
                  data={response?.data || []}
                  totalRecords={response?.items}
                  onPageChange={changePageNumber}
                  pageNumber={pageNumber}
                />
              </PageLoader>
            </Box>
          )}
        </TableContainer>
      </Stack>
      <ConfirmationModal
        onClose={onClose}
        onSubmit={onDeleteConfirm}
        open={showDeleteConfirmationModal}
      />
    </>
  );
};

export default Users;
