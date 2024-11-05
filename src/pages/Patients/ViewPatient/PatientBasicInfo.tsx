import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import {
  ErrorBoundary,
  InfoField,
  PageLoader,
  Table,
  TableError,
} from 'src/components';
import { formatDate } from 'src/util/common';

interface PatientBasicInfoProps {
  patientDetails?: Patient;
}

const PatientBasicInfo: React.FC<PatientBasicInfoProps> = ({
  patientDetails,
}): JSX.Element => {
  return (
    <Stack spacing={6}>
      <Stack spacing={2}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          flexWrap="wrap"
          rowGap="20px"
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
            value={formatDate(patientDetails?.patientRegDate || new Date())}
            flexBasis="50%"
          />
          <InfoField
            label="Contact Number"
            value={patientDetails?.patientMobile1}
            flexBasis="50%"
          />
          <InfoField
            label="Alternate Contact Number"
            value={patientDetails?.patientMobile2}
            flexBasis="50%"
          />
          <InfoField
            label="Cashier Name"
            value={patientDetails?.cashierName}
            flexBasis="50%"
          />
          <InfoField
            label="Medical History"
            value={patientDetails?.patientMedicalHistory}
            flexBasis="50%"
          />
          <InfoField
            label="Medical Reports"
            value={patientDetails?.patientReports}
            flexBasis="50%"
          />
        </Box>
      </Stack>
      <Box>
        <Typography
          variant="appBlack"
          sx={{ fontSize: '15px', fontWeight: 700 }}
        >
          Patient Procedures
        </Typography>
        <Box sx={{ marginTop: '13px' }}>
          <ErrorBoundary fallbackComponent={TableError}>
            <PageLoader
              isLoading={false}
              Components={{ Loading: 'table' }}
              isEmpty={true}
              emptyMessage="No Patient Procedures"
            >
              {/** TODO: Implement patient procedures table */}
              <Table data={[]} columns={[]} enableRowSelection={false} />
            </PageLoader>
          </ErrorBoundary>
        </Box>
      </Box>
    </Stack>
  );
};

export default PatientBasicInfo;
