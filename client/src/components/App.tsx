import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import useStore from 'store';
import { login, logout, refreshToken, getRedditAuthUrl } from '../api';

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

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');
    const authStatus = localStorage.getItem('authorized');

    if (!authStatus && !code) {
      getUrl();
    } else if (!authStatus && code) {
      login(code);
      const url = document.location.href;
      window.history.pushState({}, '', url.split('?')[0]);
      localStorage.setItem('authorized', 'true');
      setAuthorized(true);
    }
  }, []);

  const exit = () => {
    logout();
    setAuthorized(false);
    localStorage.removeItem('authorized');
  };

  return (
    <div>
      {!authorized && <a href={authUrl}>login</a>}
      {authorized && (
        <div>
          <ul>
            {subreddits.map((item) => (
              <li>{item}</li>
            ))}
          </ul>
          <button onClick={exit}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default App;
