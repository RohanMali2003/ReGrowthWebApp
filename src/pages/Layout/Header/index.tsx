import React, { useMemo } from 'react';
import { EllipsesDropdown, EllipsesDropdownOptions } from 'src/components';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AvatarIcon, regrowthIcon } from 'src/assets';
import { BLACK } from 'src/constants/colors';

import './Header.scss';
import { getAuthInfo, Logout } from 'src/util/auth';

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
  const { userInfo } = getAuthInfo();
  const headerDropdownOptions = useMemo<EllipsesDropdownOptions>(
    () => [
      {
        label: 'Logout',
        action: () => {
          Logout();
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
        <img src={regrowthIcon} alt="logo" width="auto" height="auto" />
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
              WELCOME, {userInfo}
            </Typography>
            <Avatar
              alt={userInfo?.username}
              sx={{ height: '45px', width: '45px', marginRight: '12px',  }}
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
