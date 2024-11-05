import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MUIBreadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import {
  breadcrumbsDisabledLinkItem,
  breadcrumbsLinkItem,
  breadcrumbsWrapper,
} from './styles';

type BreadcrumbsProps = {
  links: BreadcrumbLink[];
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ links }) => {
  const navigate = useNavigate();
  const location = useLocation();

  function onLinkClick(breadCrumbLink: string, disabled: boolean) {
    if (!disabled) {
      return function () {
        navigate(breadCrumbLink);
      };
    }
  }

  return (
    <MUIBreadcrumbs sx={breadcrumbsWrapper} aria-label="breadcrumbs">
      {links.map((breadCrumbLink) => {
        const isLinkDisabled =
          location.pathname === breadCrumbLink.href ||
          breadCrumbLink.href === '#';

        return (
          <Typography
            key={`${breadCrumbLink.href}-${breadCrumbLink.label}`}
            sx={breadcrumbsWrapper}
          >
            <Link
              sx={
                isLinkDisabled
                  ? breadcrumbsDisabledLinkItem
                  : breadcrumbsLinkItem
              }
              onClick={onLinkClick(breadCrumbLink.href, isLinkDisabled)}
            >
              {breadCrumbLink.label}
            </Link>
          </Typography>
        );
      })}
    </MUIBreadcrumbs>
  );
};

export default Breadcrumbs;
