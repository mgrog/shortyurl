import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import fetchRedirect from '../../utils/db/queries/fetchRedirect';

const Redirect: NextPage = () => {
  const router = useRouter();
  const { pid } = router.query;

  const [, setRedirectUrl] = useState('');

  useEffect(() => {
    async function fetchData() {
      if (!pid) return;
      const data = await fetchRedirect(pid as string);
      setRedirectUrl(data?.longUrl);
      window.location.href = data?.longUrl;
    }
    fetchData();
  }, [pid]);

  return <div>Redirecting... </div>;
};

export default Redirect;
