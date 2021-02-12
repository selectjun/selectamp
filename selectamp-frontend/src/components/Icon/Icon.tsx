import React from 'react';
import * as svg from './svg';

export type IconType = keyof typeof svg;
export type IconProps = {
  name: IconType,
  className?: string,
  style?: React.CSSProperties
};

export default function Icon({ name, className, style }: IconProps) {
  return React.createElement(svg[name], {
    className,
    style,
  });
};