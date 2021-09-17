import Image from 'next/image';
import Button from './Button';
import copyImg from '../../public/content_copy.svg';
import { useEffect, useState } from 'react';

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
            imgSrc={copyImg}
            className={`rounded-r-xl icon-button ${copied ? 'bg-green-500' : 'bg-gray-400'}`}
            click={() => copyToClip(url)}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Url;
