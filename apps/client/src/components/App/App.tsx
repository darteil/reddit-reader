import { useState, useEffect } from "react";
import useStore from "store";
import { getPosts, login, logout, getRedditAuthUrl } from "api";
import { Wrapper } from "../Wrapper";
import { LoginPage } from "../LoginPage";

const App = () => {
  const [subreddits, setSubreddits] = useState<string[]>([]);
  const authorized = useStore((state) => state.authorized);
  const setAuthorized = useStore((state) => state.setAuthorized);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get("code");

    if (authorized) {
      getPosts();
    } else if (code) {
      login(code).then(() => {
        setAuthorized(true);
        getPosts();
      });
    }
  }, []);

  return (
    <div>
      {authorized && <Wrapper />}
      {!authorized && <LoginPage />}
    </div>
  );
};

export default App;
