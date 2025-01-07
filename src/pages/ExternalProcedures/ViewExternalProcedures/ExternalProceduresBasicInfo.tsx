import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import {
  InfoField,
} from 'src/components';
import { formatDate } from 'src/util/common';

interface ExternalProcedureBasicInfoProps {
  externalProcedureDetails?: ExternalProcedure;
}

const ExternalProcedureBasicInfo: React.FC<ExternalProcedureBasicInfoProps> = ({
  externalProcedureDetails,
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
            label="Type"
            value={externalProcedureDetails?.procedureType}
            flexBasis="50%"
          />
           <InfoField
            label="Doctor Name"
            value={externalProcedureDetails?.doctorName}
            flexBasis="50%"
          />
          <InfoField
            label="Details"
            value={externalProcedureDetails?.procedureDetail}
            flexBasis="50%"
          />
          <InfoField
            label="Cashier Name"
            value={externalProcedureDetails?.cashierName}
            flexBasis="50%"
          />
          <InfoField
            label="Date"
            value={formatDate(externalProcedureDetails?.procedureDate || new Date())}
            flexBasis="50%"
          />
          <InfoField
            label="Time"
            value={formatDate(externalProcedureDetails?.timestamp || new Date())}
            flexBasis="50%"
          />
          <InfoField
            label="Fees Charged (₹)"
            value={`${externalProcedureDetails?.feesCharged}`}
            flexBasis="50%"
          />
          <InfoField
            label="Discount (%)"
            value={`${externalProcedureDetails?.discount} %`}
            flexBasis="50%"
          />
          <InfoField
            label="Total Amount (₹)"
            value={`${externalProcedureDetails?.finalAmount}`}
            flexBasis="50%"
          />  
        </Box>
      </Stack>
    </Stack>
  );
};

export default ExternalProcedureBasicInfo;
