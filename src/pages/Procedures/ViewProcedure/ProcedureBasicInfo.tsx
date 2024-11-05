import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import {
  InfoField,
} from 'src/components';
import { formatDate } from 'src/util/common';

interface ProcedureBasicInfoProps {
  procedureDetails?: Procedure;
}

const ProcedureBasicInfo: React.FC<ProcedureBasicInfoProps> = ({
  procedureDetails,
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
            value={procedureDetails?.procedureType}
            flexBasis="50%"
          />
          <InfoField
            label="Details"
            value={procedureDetails?.procedureDetails}
            flexBasis="50%"
          />
          <InfoField
            label="Cashier Name"
            value={procedureDetails?.procedureCashierName}
            flexBasis="50%"
          />
          <InfoField
            label="Clinic Name"
            value={procedureDetails?.clinicName}
            flexBasis="50%"
          />
          <InfoField
            label="Date"
            value={formatDate(procedureDetails?.procedureDate || new Date())}
            flexBasis="50%"
          />
          <InfoField
            label="Time"
            value={formatDate(procedureDetails?.procedureTime || new Date())}
            flexBasis="50%"
          />
          <InfoField
            label="Total Amount"
            value={`${procedureDetails?.totalAmount}`}
            flexBasis="50%"
          />
          <InfoField
            label="Discount"
            value={`${procedureDetails?.discount} %`}
            flexBasis="50%"
          />
        </Box>
      </Stack>
    </Stack>
  );
};

export default ProcedureBasicInfo;
