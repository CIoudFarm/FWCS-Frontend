import React from 'react';
import IconImage from '../../assets/icon.png';

const BrandIcon = ({ size = 100, ...props }) => (
  <img
    src={IconImage.src}
    alt="Brand Icon"
    width={size}
    height={size}
    {...props}
  />
);

export { BrandIcon };
