import React from 'react';
import Typography from '@mui/material/Typography';

import Link from '../Link';

type InfoFieldText = {
  to?: string | string[];
  value: string | JSX.Element | string[];
};

export default function InfoFieldText({ to, value }: InfoFieldText) {
  const text = Array.isArray(value) ? value.join(', ') : value;

  if (!to) {
    return <Typography variant="secondary">{text}</Typography>;
  }

  if (Array.isArray(to) && Array.isArray(value)) {
    if (!to.length) {
      return <Typography variant="primary">-</Typography>;
    }

    return (
      <>
        {to.map((link, index) => (
          <Link key={link} to={link}>
            {value[index]}
          </Link>
        ))}
      </>
    );
  }

  if (typeof to === 'string' && value !== '-') {
    return <Link to={to}>{text}</Link>;
  }

  return text;
}
