import React from 'react';
import { GRAY34, LIGHT_GRAY } from 'src/constants/colors';
import Typography from '@mui/material/Typography';
import { DASHBOARD_PATH } from 'src/constants/paths';

const styles = {
  fontSize: '14px',
  lineHeight: '17px',
  fontWeight: 400,
  textAlign: 'right',
  color: GRAY34,
  cursor: 'pointer',
  textDecoration: 'none',
};

const RightPanelFooter: React.FC = () => (
  <div className="rightPanelFooter">
    <Typography sx={styles} component="a" href={DASHBOARD_PATH} target="_blank">
      Terms of Use
    </Typography>
    <span className="mx-2" style={{ color: LIGHT_GRAY }}>
      |
    </span>
    <Typography sx={styles} component="a" href={DASHBOARD_PATH} target="_blank">
      Privacy Policy
    </Typography>
  </div>
);

export default RightPanelFooter;
