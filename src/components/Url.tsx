import Image from 'next/image';
import Button from './Button';
import CopySvg from './CopySvg';

type UrlProps = {
  labelText: string;
  url: string;
  imgSrc: any;
  imgAlt: string;
  copyable?: boolean;
  copied?: boolean;
  setCopied?: (v: boolean) => void;
};

const Url = ({ labelText, url, imgSrc, imgAlt, copyable, copied, setCopied }: UrlProps) => {
  const copyToClip = (url: string) => {
    navigator.clipboard.writeText(url);
    if (setCopied) {
      setCopied(true);
    }
  };

  return (
    <div className="flex flex-col w-full mb-4">
      <label className="mb-1 flex align-center">
        <Image src={imgSrc} alt={imgAlt} height={24} width={24} />
        <span className="ml-2">{labelText}</span>
      </label>
      <div className="flex flex-row w-full">
        <input
          name="url"
          readOnly
          className="p-4 rounded-l-xl border flex-grow"
          style={{ overflowX: 'clip' }}
          value={url}
        />
        {copyable ? (
          <Button
            className={`rounded-r-xl icon-button hover:bg-gray-100 bg-transparent border border-l-0 border-gray-200`}
            click={() => copyToClip(url)}>
            <CopySvg fill={`${copied ? '#10B981' : '#6B7280'}`}></CopySvg>
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default Url;
