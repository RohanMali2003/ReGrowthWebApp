import React from 'react';
import Box from '@mui/material/Box';
import { SxProps } from '@mui/system/styleFunctionSx';

import { FADED_BLACK, FADED_WHITE } from 'src/constants/colors';
import { Icon, IconMappingKeys } from 'src/components';

interface NoDataProps {
  message?: string;
  icon?: IconMappingKeys;
  sxProps?: SxProps;
}

export const NoData: React.FC<NoDataProps> = ({
  message = 'No Data found',
  icon,
  sxProps,
}) => {
  const flexForMainBox = `flex-${icon ? 'center' : 'start'} border-rad-7`;
  const flexForIconBox = `d-flex flex-column align-items-${
    icon ? 'center' : 'start'
  }`;

  return (
    <Box
      sx={{
        backgroundColor: FADED_WHITE,
        padding: '13px 0px 18px 17px',
        ...sxProps,
      }}
      className={flexForMainBox}
    >
      <Box className={flexForIconBox}>
        {icon && (
          <div>
            <Icon icon={icon} size="40" color={FADED_BLACK} />
          </div>
        )}
        <span className="text-alaitoc-blue mt-2">{message}</span>
      </Box>
    </Box>
  );
};

export default NoData;
