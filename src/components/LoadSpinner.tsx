import Image from 'next/image';
import imgSrc from '../../public/hourglass.svg';

const LoadSpinner = () => {
  return <Image className="animate-flip" src={imgSrc} height={48} width={48} alt="spinner" />;
};

export default LoadSpinner;
