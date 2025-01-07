import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import {
  Button,
  ErrorBoundary,
  InfoField,
  PageLoader,
  Table,
  TableError,
} from 'src/components';
import { formatDate } from 'src/util/common';
import { WHITE_SMOKE } from 'src/constants/colors';
import Divider from '@mui/material/Divider';
import { FiUser } from 'react-icons/fi';
import { ProceduresTableColumns } from '../../Procedures/constants';
import { RiHistoryFill } from 'react-icons/ri';
import { TbReportSearch } from 'react-icons/tb';
import { useGetProceduresListByPatientId } from 'src/hooks/usePatients';
import { useNavigate, useParams } from 'react-router-dom';
import { usePagination } from 'src/hooks/usePagination';
import { NEW_PROCEDURE_PATH } from 'src/constants/paths';

interface PatientBasicInfoProps {
  patientDetails?: Patient;
}

const PatientBasicInfo: React.FC<PatientBasicInfoProps> = ({
  patientDetails
}): JSX.Element => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const { pageNumber, changePageNumber } = usePagination();
  const { response, isFetching } = useGetProceduresListByPatientId(id, {
    apiConfig: {
      params: {
        _page: pageNumber,
      },
    },
  });
      
  return (
    <Stack spacing={6}>
      <Stack spacing={2}>
        <Box
          display="flex"
          alignItems="flex-start"
          justifyContent="flex-start"
          sx={{ width: '100%' }}
        >
          <Box
            sx={{
              rowGap: '20px',
              minHeight: '60px',
              padding: '20px',
              borderRadius: '10px',
              width: '45%',
              marginRight: '20px',
              backgroundColor: WHITE_SMOKE,
            }}
          >
            <Stack spacing={2}>
              <Typography
                variant="appBlack"
                sx={{
                  fontSize: '15px',
                  fontWeight: 700,
                  marginTop: '13px',
                  paddingLeft: '20px',
                }}
              >
                PERSONAL INFORMATION
              </Typography>
            </Stack>
            <Divider sx={{ marginTop: '13px' }} />
            <Stack spacing={6}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  rowGap: '20px',
                  minHeight: '60px',
                  padding: '20px',
                  borderRadius: '10px',
                  backgroundColor: WHITE_SMOKE,
                }}
              >
                <InfoField
                  label="First Name"
                  value={patientDetails?.firstName}
                  flexBasis="50%"
                />
                <InfoField
                  label="Middle Name"
                  value={patientDetails?.middleName}
                  flexBasis="50%"
                />
                <InfoField
                  label="Last Name"
                  value={patientDetails?.lastName}
                  flexBasis="50%"
                />
                <InfoField
                  label="Age"
                  value={`${patientDetails?.patientAge}`}
                  flexBasis="50%"
                />
                <InfoField
                  label="Gender"
                  value={patientDetails?.patientGender}
                  flexBasis="50%"
                />
                <InfoField
                  label="Registration Date"
                  value={formatDate(
                    patientDetails?.patientRegDate || new Date(),
                  )}
                  flexBasis="50%"
                />
                <InfoField
                  label="Contact Number"
                  value={String(patientDetails?.patientMobile1)}
                  flexBasis="50%"
                />
                <InfoField
                  label="Alternate Contact Number"
                  value={String(patientDetails?.patientMobile2?.toString())}
                  flexBasis="50%"
                />
              </Box>
            </Stack>
          </Box>
          <Box
            sx={{
              rowGap: '20px',
              minHeight: '100px',
              width: '45%',
              padding: '20px',
              borderRadius: '10px',
              backgroundColor: WHITE_SMOKE,
            }}
          >
            <Stack spacing={2}>
              <Typography
                variant="appBlack"
                sx={{
                  fontSize: '15px',
                  fontWeight: 700,
                  marginTop: '13px',
                  paddingLeft: '20px',
                }}
              >
                MEDICAL HISTORY
              </Typography>
            </Stack>
            <Divider sx={{ marginTop: '13px' }} />
            <Stack spacing={6} sx={{ marginTop: '13px', paddingLeft: '20px' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  margin: '10px',
                }}
              >
                <FiUser size="20px" />
                <InfoField
                  sx={{ marginLeft: '10px' }}
                  label="Cashier Name"
                  value={patientDetails?.cashierName}
                  flexBasis="50%"
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                }}
              >
                <RiHistoryFill size="20px" />
                <InfoField
                  sx={{ marginLeft: '10px' }}
                  label="Medical History"
                  value={patientDetails?.patientMedicalHistory}
                  flexBasis="50%"
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  margin: '10px',
                }}
              >
                <TbReportSearch size="20px" />
                <InfoField
                  sx={{ marginLeft: '10px' }}
                  label="Medical Reports"
                  value={patientDetails?.patientReports}
                  flexBasis="50%"
                />
              </Box>
            </Stack>
          </Box>
        </Box>
      </Stack> 
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="appBlack"
            sx={{ fontSize: '23px', fontWeight: 700, marginTop: '13px' }}
          >
            Patient Procedures
          </Typography>
          
          <Button
            variant="outlined"
            sx={{ padding: '20px' }}
            onClick={() => navigate(NEW_PROCEDURE_PATH, { state: id  })}
          >
            New Procedure
          </Button>
        </Box>
        <Box sx={{ marginTop: '13px' }}>
          <ErrorBoundary fallbackComponent={TableError}>
            <PageLoader
              isLoading={isFetching}
              Components={{ Loading: 'table' }}
              emptyMessage="No Patient Procedures"
            >
              <Table
                columns={ProceduresTableColumns}
                data={response?.content || []}
                totalRecords={response?.items}
                onPageChange={changePageNumber}
                pageNumber={pageNumber}
              />
            </PageLoader>
          </ErrorBoundary>
        </Box>
      </Box>
    </Stack>
  );
};

export default PatientBasicInfo;
