import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  BLACK,
  FADED_BLACK,
  GRAY34,
  PRIMARY_BLUE,
  WHITE_SMOKE,
} from 'src/constants/colors';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Icon from 'src/components/Icon';

interface NavItemData {
  title: string | JSX.Element;
  icon?: JSX.Element;
  route?: string;
  options?: NavItemData[];
  action?: () => void;
  isSubItem?: boolean;
}

type NavItemProps = {
  option: NavItemData;
  isHeading?: boolean;
  isSubItem?: boolean;
};

export const NavItem: React.FC<NavItemProps> = ({
  option,
  isHeading,
  isSubItem = false,
}) => {
  const {
    title,
    icon = <Icon icon="dot" size="22" data-testid="submenu-icon" />,
    route,
    options,
    action,
  } = option;
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const isActive = `/${location.pathname.split('/')[1]}` === route;

  const handleListItemClick = () => {
    if (action) {
      action();
    } else if (route) {
      navigate(route);
    } else if (options?.length) {
      setShowOptionsMenu(!showOptionsMenu);
    }
  };

  return (
    <>
      <ListItem
        sx={{
          padding: 0,
          borderLeft: isActive ? `3px solid ${PRIMARY_BLUE}` : 'none',
        }}
      >
        <ListItemButton
          onClick={handleListItemClick}
          sx={{ paddingY: '7.5px', paddingX: isSubItem ? '8px' : '23px' }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              marginRight: '14px',
              color: isActive ? PRIMARY_BLUE : FADED_BLACK,
            }}
          >
            {icon}
          </ListItemIcon>
          <ListItemText
            disableTypography
            sx={{
              fontWeight: isHeading || isActive ? 600 : 400,
              fontSize: '14px',
              lineHeight: '17px',
              color: isActive ? BLACK : GRAY34,
            }}
            primary={title}
          />
          {!!options?.length && (
            <ListItemIcon
              sx={{
                position: 'absolute',
                right: 0,
                display: 'flex',
                justifyContent: 'space-around',
              }}
            >
              {showOptionsMenu ? <FiChevronUp /> : <FiChevronDown />}
            </ListItemIcon>
          )}
        </ListItemButton>
      </ListItem>
      <Box bgcolor={WHITE_SMOKE} borderRadius="4px" marginX="16px">
        {showOptionsMenu && !!options?.length
          ? options.map((option, index) => (
              <NavItem key={index} option={option} isSubItem />
            ))
          : null}
      </Box>
    </>
  );
};
