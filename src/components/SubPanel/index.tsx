import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { DASHBOARD_PATH } from 'src/constants/paths';
import { Breadcrumbs, Button, PageTitle } from 'src/components';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

interface HeaderPanelProps {
  pageTitle: string;
  breadcrumbLinks: BreadcrumbLink[];
  rightSideButtonText?: string;
  rightSideButtonClickEvent?: () => void;
  rightSideButtonIcon?: JSX.Element;
  rightSideButtonEndIcon?: JSX.Element;
  hideRightSideButtonStartIcon?: boolean;
  secondaryButtonText?: string;
  secondaryButtonIcon?: JSX.Element;
  secondaryButtonClickEvent?: () => void;
  tertiaryJSXFragments?: JSX.Element;
  secondaryButtonType?: 'submit' | 'button' | 'reset';
  disableRightButton?: boolean;
  disableSecondaryButton?: boolean;
}
export const SubPanel: React.FC<HeaderPanelProps> = ({
  pageTitle,
  breadcrumbLinks,
  rightSideButtonText,
  rightSideButtonClickEvent,
  rightSideButtonIcon,
  rightSideButtonEndIcon,
  secondaryButtonClickEvent,
  secondaryButtonText,
  secondaryButtonIcon,
  tertiaryJSXFragments,
  secondaryButtonType = 'button',
  disableRightButton = false,
  disableSecondaryButton = false,
  hideRightSideButtonStartIcon = false,
}) => {
  return (
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
        <PageTitle>{pageTitle}</PageTitle>
        <Breadcrumbs
          links={[
            {
              label: 'Dashboard',
              href: DASHBOARD_PATH,
            },
            ...breadcrumbLinks,
          ]}
        />
      </Box>
      <Stack direction="row" spacing={1.5}>
        {secondaryButtonText ? (
          <Button
            variant="contained"
            type={secondaryButtonType}
            startIcon={secondaryButtonIcon}
            onClick={secondaryButtonClickEvent}
            disabled={disableSecondaryButton}
          >
            {secondaryButtonText}
          </Button>
        ) : null}
        {rightSideButtonText ? (
          <Button
            variant="contained"
            startIcon={
              !hideRightSideButtonStartIcon
                ? (rightSideButtonIcon ?? <FiPlus />)
                : null
            }
            onClick={rightSideButtonClickEvent}
            sx={{ marginLeft: '15px' }}
            disabled={disableRightButton}
            endIcon={rightSideButtonEndIcon}
          >
            {rightSideButtonText}
          </Button>
        ) : null}
        {tertiaryJSXFragments}
      </Stack>
    </Box>
  );
};

export default SubPanel;
