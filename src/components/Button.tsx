import Image from 'next/image';
import { ReactNode } from 'react';

type ButtonProps = {
  className: string;
  text?: string;
  imgSrc?: any;
  click: () => void;
  children?: ReactNode;
};

const Button = ({ text, className, imgSrc, click, children }: ButtonProps) => {
  return (
    <button
      style={{ minWidth: '55px' }}
      className={`px-4 py-2 text-white ${className}`}
      onClick={click}>
      {text}
      {imgSrc ? <Image src={imgSrc} height={25} width={25} alt="copy to clipboard" /> : null}
      {children}
    </button>
  );
};

export default Button;
