import React from 'react';

import { getIcon, IconMappingKeys } from './iconMappings';

interface IconProps {
  icon: IconMappingKeys;
  fill?: string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  size?: string;
  cursor?: string;
}

export const Icon: React.FC<IconProps> = ({
  icon,
  fill = 'none',
  color,
  ...rest
}) => {
  const IconValue = getIcon(icon);

  return <IconValue fill={fill} color={color || fill} {...rest} />;
};

export default Icon;
