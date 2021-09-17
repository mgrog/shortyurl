import Image from 'next/image';

type ButtonProps = {
  className: string;
  text?: string;
  imgSrc?: string;
  click: () => void;
};

const Button = ({ text, className, imgSrc, click }: ButtonProps) => {
  return (
    <button
      style={{ minWidth: '55px' }}
      className={`px-4 py-2 text-white ${className}`}
      onClick={click}>
      {text}
      {imgSrc ? <Image src={imgSrc} height={25} width={25} alt="copy to clipboard" /> : null}
    </button>
  );
};

export default Button;
