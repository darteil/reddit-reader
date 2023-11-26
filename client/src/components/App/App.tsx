import { useState, useEffect } from 'react';
import useStore from 'store';
import { getPosts, login, logout, getRedditAuthUrl } from 'api';
import { Wrapper } from '../Wrapper';

const App = () => {
  const [authUrl, setAuthUrl] = useState('');
  const [subreddits, setSubreddits] = useState<string[]>([]);
  const authorized = useStore((state) => state.authorized);
  const setAuthorized = useStore((state) => state.setAuthorized);

  useEffect(() => {
    const getUrl = async () => {
      const url = await getRedditAuthUrl();
      setAuthUrl(url);
    };

    getPosts();

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');

    if (!authorized && !code) {
      getUrl();
    } else if (!authorized && code) {
      login(code);
      setAuthorized(true);
    } else if (authorized) {
      setAuthorized(true);
    }
  }, []);

  return (
    <div>
      {!authorized && <a href={authUrl}>login</a>}
      {authorized && <Wrapper />}
    </div>
  );
};

export default App;
