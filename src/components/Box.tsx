import { ReactNode, useEffect, useState } from 'react';

type BoxProps = {
  children: ReactNode;
  trigger: boolean;
};

const Box = ({ children, trigger }: BoxProps) => {
  const fadeInStyle = () => {
    return trigger
      ? 'transition-all duration-500 transform translate-y-0 opacity-100'
      : 'opacity-0';
  };
  return (
    <div className={`px-8 py-4 bg-white rounded-xl shadow-xl box ${fadeInStyle()}`}>{children}</div>
  );
};

export default Box;
