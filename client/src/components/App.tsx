import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import useStore from 'store';
import { login, getRedditAuthUrl } from '../api';

const App = () => {
  const [authUrl, setAuthUrl] = useState('');

  useEffect(() => {
    const getUrl = async () => {
      const url = await getRedditAuthUrl();
      setAuthUrl(url);
    };

    if (!Cookies.get('token')) {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const code = urlParams.get('code');
      if (code) {
        login(code);
      } else {
        getUrl();
      }
    }
  }, []);

  return (
    <div>
      {authUrl && <a href={authUrl}>login</a>}
      {!authUrl && <div>Welcome to hell</div>}
    </div>
  );
};

export default App;
