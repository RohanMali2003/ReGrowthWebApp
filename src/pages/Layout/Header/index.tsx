import React, { useMemo } from 'react';
import { EllipsesDropdown, EllipsesDropdownOptions } from 'src/components';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AvatarIcon, ReactIcon } from 'src/assets';
import { BLACK } from 'src/constants/colors';

import './Header.scss';

export type NotificationMessage = {
  id: string;
  email: string;
  organization: string;
  subject: string;
  content: string;
  timestamp: string;
  unread: boolean;
};

const Header: React.FC = () => {
  const headerDropdownOptions = useMemo<EllipsesDropdownOptions>(
    () => [
      {
        label: 'Logout',
        action: () => {
          console.log('Logout');
        },
      },
      {
        label: 'Profile Management',
        action: () => {
          console.log('test');
        },
      },
    ],
    [],
  );

  return (
    <Box className="header">
      <Box className="logo">
        {' '}
        <img src={ReactIcon} alt="logo" width="auto" height="auto" />
      </Box>
      <Box className="headerContent">
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{ display: 'flex', alignItems: 'center', paddingRight: '28px' }}
          >
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '17px',
                color: BLACK,
                marginRight: '12px',
              }}
            >
              Omkar Joshi
            </Typography>
            <Avatar
              alt="Omkar Joshi"
              sx={{ height: '45px', width: '45px', marginRight: '12px' }}
              src={AvatarIcon}
            />
            <EllipsesDropdown
              type="arrowDropdown"
              options={headerDropdownOptions}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
