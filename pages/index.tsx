import type { NextPage } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import InputBar from '../src/components/InputBar';
import Button from '../src/components/Button';
import Box from '../src/components/Box';
import styles from '../styles/Home.module.css';
import Url from '../src/components/Url';
import linkImg from '../public/link.svg';
import shortcutImg from '../public/shortcut.svg';
import LoadSpinner from '../src/components/LoadSpinner';
import requisitionURL from '../utils/db/queries/requisitionURL';
import normalizeUrl from 'normalize-url';

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [longUrl, setLongUrl] = useState('');
  const [urlReady, setUrlReady] = useState(false);
  const [urlMap, setUrlMap] = useState({ id: '', shortUrl: '', longUrl: '' });
  const [urlCopied, setUrlCopied] = useState('');

  const getURL = async () => {
    const normalizedUrl = normalizeUrl(longUrl);
    console.log('get url', normalizedUrl);
    setLoading(true);
    setUrlReady(false);

    const url = await requisitionURL(normalizedUrl);
    setUrlMap(url!);
    setLoading(false);
    setUrlReady(true);
  };

  return (
    <div
      className={`${styles.container} font-sans bg-gradient-to-br from-green-400 via-green-500 to-purple-600`}>
      <Head>
        <title>Shorty URLs</title>
        <meta name="description" content="Short url generator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h2 className="self-start fun-text text-3xl text-white">Shorty URL</h2>

      <main className={styles.main}>
        <h1 className="md:text-6xl sm:text-4xl text-2xl mb-12">
          Welcome to <span className="fun-text">Shorty URL</span>
        </h1>

        <p className="md:text-2xl text-md">Enter long urls and get a short one</p>

        <div className="flex w-full my-6">
          <InputBar setUrl={setLongUrl} submitForm={getURL} />
          <Button className="bg-blue-700 rounded-r-3xl -ml-1" text={'Get Shorty!'} click={getURL} />
        </div>
        {loading ? <LoadSpinner /> : null}
        <Box trigger={urlReady}>
          <Url
            labelText={'Your long URL'}
            url={urlMap.longUrl}
            imgSrc={linkImg}
            imgAlt="link icon"
          />
          <Url
            labelText={'Shorty URL'}
            url={urlMap.shortUrl}
            imgSrc={shortcutImg}
            imgAlt="shortcut icon"
            copyable
            copied={urlCopied === 'short'}
            setCopied={(v) => setUrlCopied(v ? 'short' : '')}
          />
        </Box>
      </main>
    </div>
  );
};

export default Home;
